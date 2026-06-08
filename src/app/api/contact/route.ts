import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const entry = { ...body, submittedAt: new Date().toISOString() }

    const filePath = path.join(process.cwd(), 'data', 'submissions.json')
    let submissions: unknown[] = []
    try {
      submissions = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    } catch {}
    submissions.push(entry)
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2))

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
