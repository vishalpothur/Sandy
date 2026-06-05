import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import { body, validationResult } from 'express-validator'
import nodemailer from 'nodemailer'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001
const isProd = process.env.NODE_ENV === 'production'

// Security & performance middleware
app.use(helmet({
  contentSecurityPolicy: isProd ? undefined : false,
}))
app.use(cors({
  origin: isProd ? false : ['http://localhost:5173', 'http://localhost:4173'],
  credentials: true,
}))
app.use(compression())
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: false, limit: '10kb' }))

// Rate limiting for API routes
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
})
app.use('/api/', apiLimiter)

// Ensure data directory exists
const DATA_DIR = join(__dirname, 'data')
const SUBMISSIONS_FILE = join(DATA_DIR, 'submissions.json')
if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })

function readSubmissions() {
  if (!existsSync(SUBMISSIONS_FILE)) return []
  try {
    return JSON.parse(readFileSync(SUBMISSIONS_FILE, 'utf8'))
  } catch {
    return []
  }
}

function saveSubmission(data) {
  const submissions = readSubmissions()
  submissions.push(data)
  writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2))
}

// Nodemailer transport (optional)
function createTransport() {
  if (!process.env.SMTP_HOST) return null
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// Contact form validation
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 60 })
    .withMessage('Name must be between 2 and 60 characters'),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('phone')
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone must be a 10-digit number'),
  body('shootType')
    .isIn(['Baby', 'Kids', 'Family', 'Maternity', 'Wedding', 'Portrait', 'Fashion', 'Events', 'Travel', 'Other'])
    .withMessage('Please select a valid shoot type'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
]

// POST /api/contact
app.post('/api/contact', contactValidation, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    })
  }

  const { name, email, phone, shootType, message } = req.body
  const submission = {
    id: uuidv4(),
    name,
    email,
    phone,
    shootType,
    message,
    submittedAt: new Date().toISOString(),
    ip: req.ip,
  }

  try {
    saveSubmission(submission)
  } catch (err) {
    console.error('Failed to save submission:', err)
    return res.status(500).json({ success: false, message: 'Internal server error' })
  }

  // Send email notification if SMTP is configured
  const transport = createTransport()
  if (transport && process.env.NOTIFY_EMAIL) {
    try {
      await transport.sendMail({
        from: `"Sandy Photography" <${process.env.SMTP_USER}>`,
        to: process.env.NOTIFY_EMAIL,
        subject: `New Booking Inquiry — ${shootType} from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd">+91 ${phone}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>Shoot Type</strong></td><td style="padding:8px;border:1px solid #ddd">${shootType}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>Message</strong></td><td style="padding:8px;border:1px solid #ddd">${message}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>Submitted At</strong></td><td style="padding:8px;border:1px solid #ddd">${submission.submittedAt}</td></tr>
          </table>
        `,
      })
    } catch (err) {
      console.error('Email notification failed (non-critical):', err.message)
    }
  }

  return res.json({
    success: true,
    message: "Thank you! Sandy will reach out within 24 hours.",
  })
})

// Serve static files in production
if (isProd) {
  const distDir = join(__dirname, 'dist')
  if (!existsSync(distDir)) {
    console.error('ERROR: dist/ folder not found. Run "npm run build" before starting in production.')
    process.exit(1)
  }
  app.use(express.static(distDir, { maxAge: '1y', etag: true }))
  app.get('*', (req, res) => {
    res.sendFile(join(distDir, 'index.html'))
  })
}

// Global error handler
app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ success: false, message: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Sandy Photography server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`)
})

export default app
