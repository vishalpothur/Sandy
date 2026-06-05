# Sandy Photography — Deployment Guide (Hostinger Node.js)

## 1. Prerequisites

- Node.js >= 18.x (Hostinger supports Node.js via hPanel)
- Git access or FTP client (FileZilla / Hostinger File Manager)
- Your domain pointed to Hostinger nameservers
- SSH access enabled in hPanel (optional but recommended)

---

## 2. Build Steps (local machine)

```bash
# Install dependencies
npm install

# Build the React frontend
npm run build
# Generates: dist/ directory with static assets

# Verify build is complete
ls dist/
# Should contain: index.html, assets/
```

---

## 3. Hostinger Panel Configuration

1. Log in to **hPanel** → Go to **Websites** → Select your domain
2. Navigate to **Advanced** → **Node.js**
3. Set the following:
   - **Node.js version**: 18.x or 20.x
   - **Application root**: `/public_html` (or your subdirectory)
   - **Application startup file**: `server.js`
   - **Application mode**: `production`
4. Click **Create** / **Save**
5. Note the auto-generated **Application URL** for testing

---

## 4. Environment Variables Setup

In hPanel → **Node.js** → **Environment Variables**, add:

| Variable        | Value                          |
|-----------------|--------------------------------|
| `PORT`          | `3001` (or Hostinger's assigned port) |
| `NODE_ENV`      | `production`                   |
| `SMTP_HOST`     | `smtp.gmail.com` (optional)    |
| `SMTP_PORT`     | `587` (optional)               |
| `SMTP_USER`     | `your@gmail.com` (optional)    |
| `SMTP_PASS`     | `your-app-password` (optional) |
| `NOTIFY_EMAIL`  | `sandy@sandyphotography.in` (optional) |

> **Note**: If `SMTP_HOST` is left blank, the contact form still works — submissions are saved to `data/submissions.json`. Email notifications are entirely optional.

> **Gmail App Password**: Go to Google Account → Security → 2-Step Verification → App passwords. Generate one for "Mail".

---

## 5. File Upload via FTP / Git

### Option A: Git Deploy (recommended)

```bash
# SSH into your Hostinger server
ssh u123456789@your-server.hostinger.com

# Navigate to public_html
cd ~/public_html

# Clone or pull your repo
git clone https://github.com/your-username/sandy-photography.git .
# OR if already cloned:
git pull origin main

# Install production dependencies
npm install --omit=dev

# Copy the pre-built dist folder (if not building on server)
# (Already built locally and pushed via git)
```

### Option B: FTP Upload

1. Build locally: `npm run build`
2. Connect via FTP (FileZilla) using Hostinger FTP credentials
3. Upload ALL files EXCEPT:
   - `node_modules/` (install on server instead)
   - `.git/`
   - `.env` (set env vars via hPanel instead)
4. Files to upload:
   - `dist/` (entire folder)
   - `src/` (entire folder)
   - `data/` (folder with `.gitkeep`)
   - `public/` (entire folder)
   - `server.js`
   - `package.json`
   - `package-lock.json`
   - `vite.config.js`
   - `tailwind.config.js`
   - `postcss.config.js`
   - `index.html`
5. Via SSH or Hostinger File Manager terminal: `npm install --omit=dev`

---

## 6. Starting the App

### Via hPanel
1. hPanel → Node.js → Click **Start** / **Restart**
2. The app runs automatically on Hostinger's managed environment

### Via SSH (manual)
```bash
# Start with npm
NODE_ENV=production node server.js

# Or using PM2 (if available on your plan)
npm install -g pm2
pm2 start server.js --name sandy-photography --env production
pm2 save
pm2 startup
```

### Verify it's running
```bash
curl http://localhost:3001/api/contact -X GET
# Should return 404 (only POST is valid) — server is alive
```

---

## 7. Custom Domain Setup

1. In hPanel → **Domains** → Point your domain to the Node.js app
2. hPanel → **SSL** → Enable **Let's Encrypt** free SSL for your domain
3. If using a subdomain (e.g., `photos.yourdomain.com`):
   - Add DNS A record pointing to your server IP
   - Then enable SSL for the subdomain

The Express server in production (`NODE_ENV=production`) serves the built React app as static files and handles all routes.

---

## 8. Replacing Placeholder Images

All images currently use Unsplash URLs. To replace with your actual photos:

### Hero background
**File**: `src/components/Hero.jsx`, line with `photo-1588776814546-daab30f310ce`
```
Replace: https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=1920&q=90
With: /images/hero-background.jpg  (upload to public/)
```

### ScrollShowcase frames
**File**: `src/components/ScrollShowcase.jsx`
- Left frame: `photo-1519741497674-611481863552` → your wedding photo
- Right frame: `photo-1531746020798-e6953c6e8e04` → your portrait photo
- Center frame: `photo-1606216794074-735e91aa2c92` → your dramatic portrait
- Small top: `photo-1583939003579-730e3918a45a` → your family photo
- Small bottom: `photo-1529634806980-85c3dd6d34ac` → your events photo

### Gallery images (24 photos)
**File**: `src/components/Gallery.jsx`, `allImages` array (lines 4–27)
Replace each `src` URL with your own hosted image URLs. Keep the `aspect` property to match your image orientations:
- `'3/4'` = portrait orientation
- `'4/3'` = landscape orientation
- `'1/1'` = square

### About section photographer portrait
**File**: `src/components/About.jsx`, line with `photo-1554048612-b6a482bc67e5`
```
Replace: https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80
With: /images/sandy-portrait.jpg
```

### Testimonial avatars
**File**: `src/components/Testimonials.jsx`, `testimonials` array
Replace each `image` URL with real client photos (get permission first) or use initials-based avatars.

### OG image
**File**: `index.html`, `og:image` meta tag
```
Replace: https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=1200&q=80
With: https://yourdomain.com/images/og-cover.jpg
```

### Hosting your own images
1. Place images in `public/images/`
2. Reference as `/images/your-photo.jpg` in the code
3. Images in `public/` are served directly by Express in production

---

## 9. Troubleshooting Common Issues

### App doesn't start
```bash
# Check Node.js version
node --version  # Must be >= 18

# Check for missing modules
npm install

# Check for syntax errors
node --check server.js
```

### Port conflicts
- Hostinger assigns a port automatically via `process.env.PORT`
- Never hardcode port 3001 in production config
- The server already reads `process.env.PORT || 3001`

### Contact form returns 500
```bash
# Check data directory exists and is writable
ls -la data/
chmod 755 data/

# Check submissions file
cat data/submissions.json
```

### Static files not loading (404)
- Ensure `npm run build` was run and `dist/` folder exists
- Ensure `NODE_ENV=production` is set
- Check `dist/index.html` exists

### CORS errors during development
- Run both `npm run dev:server` and `npm run dev:client` via `npm run dev`
- Vite proxies `/api` to `localhost:3001` automatically

### Email not sending
- Verify `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` env vars are set
- For Gmail: use App Password (not your regular password)
- Check spam folder for test emails
- Email sending is non-critical — contact form still saves to JSON if email fails

### Fonts not loading
- The site uses Google Fonts loaded in `index.html`
- Ensure server isn't blocking external CDN requests
- As fallback, Georgia (serif) and system-ui (sans) are configured in `tailwind.config.js`

### Images appear broken
- Unsplash URLs require internet access
- For production, replace with self-hosted images as described in Section 8
- Ensure `public/` directory is uploaded and accessible

---

## Quick Deploy Checklist

- [ ] `npm run build` completed successfully
- [ ] `dist/` folder exists with `index.html` and `assets/`
- [ ] `NODE_ENV=production` set in hPanel env vars
- [ ] `PORT` set correctly (or left to Hostinger's default)
- [ ] All files uploaded (excluding `node_modules/`)
- [ ] `npm install --omit=dev` run on server
- [ ] Node.js app started in hPanel
- [ ] SSL certificate active
- [ ] Custom domain pointing correctly
- [ ] Test contact form submission
- [ ] Replace placeholder images with real photos
