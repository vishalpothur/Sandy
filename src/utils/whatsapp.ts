const SANDY_WA = '918099865977'

export function openWhatsApp(message = '') {
  const url = message
    ? `https://wa.me/${SANDY_WA}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${SANDY_WA}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function serviceMessage(name: string) {
  return (
    `Hi Sandy! 👋\n\n` +
    `I'm interested in booking a *${name}* session.\n\n` +
    `Could you please share details on availability and pricing? 🌸`
  )
}

export function bookingMessage(details: {
  name: string
  phone: string
  service: string
  message?: string
}) {
  return (
    `Hi Sandy! 👋\n\n` +
    `I'd love to book a photography session!\n\n` +
    `📸 *Session:* ${details.service}\n` +
    `👤 *Name:* ${details.name}\n` +
    `📞 *Phone:* +91 ${details.phone}\n` +
    (details.message ? `\n💬 *Note:* ${details.message}\n` : '') +
    `\nLooking forward to creating beautiful memories! 🌸`
  )
}
