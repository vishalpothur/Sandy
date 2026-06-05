const SANDY_WA = '918099865977'

export function openWhatsApp(message = '') {
  const url = message
    ? `https://wa.me/${SANDY_WA}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${SANDY_WA}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function serviceMessage(serviceName) {
  return `Hi Sandy! 👋\n\nI'm interested in booking a *${serviceName}* session.\n\nCould you please share more details on availability and pricing? Looking forward to hearing from you! 🌸`
}

export function bookingMessage({ name, phone, shootType, message }) {
  return (
    `Hi Sandy! 👋\n\n` +
    `I'd love to book a session with you!\n\n` +
    `📸 *Session Type:* ${shootType}\n` +
    `👤 *Name:* ${name}\n` +
    `📞 *Phone:* +91 ${phone}\n` +
    (message ? `\n💬 *Message:* ${message}\n` : '') +
    `\nLooking forward to hearing from you! 🌸`
  )
}
