// Sandy's WhatsApp number (country code + number, no + or spaces)
const SANDY_WHATSAPP = '918099865977';

// ── State ──────────────────────────────────────────────────────
const state = { shootType: null, location: null };

// ── Parallax & scroll animations ───────────────────────────────
function onScroll() {
  const sy = window.scrollY;

  // Navbar
  document.querySelector('.navbar').classList.toggle('scrolled', sy > 40);

  // Hero background parallax
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.backgroundPositionY = `calc(50% + ${sy * 0.4}px)`;
  }

  // Gallery image parallax — each img shifts at its own speed
  document.querySelectorAll('.gallery-item').forEach(item => {
    const rect = item.getBoundingClientRect();
    const center = rect.top + rect.height / 2 - window.innerHeight / 2;
    item.querySelector('img').style.transform = `scale(1.12) translateY(${center * 0.06}px)`;
  });

  // About image subtle parallax
  const aboutImg = document.querySelector('.about .img-frame img');
  if (aboutImg) {
    const rect = aboutImg.closest('.img-frame').getBoundingClientRect();
    const center = rect.top + rect.height / 2 - window.innerHeight / 2;
    aboutImg.style.transform = `translateY(${center * 0.07}px) scale(1.08)`;
  }
}

// Intersection Observer — fade + slide up on scroll-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll(
    '.gallery-item, .service-card, .about-text, .about-img, .section-label, .section-title'
  ).forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    el.classList.add('fade-up');
    observer.observe(el);
  });
});

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll, { passive: true });

function toggleNav() {
  document.querySelector('.nav-links').classList.toggle('open');
}

// ── Modal open / close ──────────────────────────────────────────
function openModal(preselect) {
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('modalSuccess').style.display = 'none';
  document.getElementById('bookingForm').style.display = '';
  resetForm();

  if (preselect) {
    const pill = document.querySelector(`#shootType [data-value="${preselect}"]`);
    if (pill) selectPill('shootType', pill);
  }
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function closeOnOverlay(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

// ── Pill selection ──────────────────────────────────────────────
function selectPill(groupId, el) {
  document.querySelectorAll(`#${groupId} .pill`).forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  state[groupId] = el.dataset.value;

  // Show/hide custom location field
  if (groupId === 'location') {
    document.getElementById('customLocationGroup').style.display =
      el.dataset.value === 'Custom' ? '' : 'none';
  }

  // Clear error
  document.getElementById(`${groupId}Error`).classList.remove('visible');
}

// ── Validation ─────────────────────────────────────────────────
function validate() {
  let ok = true;

  if (!state.shootType) {
    document.getElementById('shootTypeError').classList.add('visible');
    ok = false;
  }
  if (!state.location) {
    document.getElementById('locationError').classList.add('visible');
    ok = false;
  }

  const name = document.getElementById('clientName').value.trim();
  if (!name) {
    document.getElementById('clientNameError').classList.add('visible');
    ok = false;
  } else {
    document.getElementById('clientNameError').classList.remove('visible');
  }

  const phone = document.getElementById('clientPhone').value.trim();
  if (!/^\d{10}$/.test(phone)) {
    document.getElementById('clientPhoneError').classList.add('visible');
    ok = false;
  } else {
    document.getElementById('clientPhoneError').classList.remove('visible');
  }

  return ok;
}

// ── Send to WhatsApp ────────────────────────────────────────────
function sendToWhatsApp(e) {
  e.preventDefault();
  if (!validate()) return;

  const name    = document.getElementById('clientName').value.trim();
  const phone   = document.getElementById('clientPhone').value.trim();
  const extra   = document.getElementById('clientMessage').value.trim();
  const locNote = state.location === 'Custom'
    ? `Custom – ${document.getElementById('customLocation').value.trim() || 'to be discussed'}`
    : state.location;

  const msg =
    `Hello Sandy! 👋\n\n` +
    `I'd love to book a photography session.\n\n` +
    `📸 *Type of Shoot:* ${state.shootType}\n` +
    `📍 *Location:* ${locNote}\n` +
    `👤 *Name:* ${name}\n` +
    `📞 *Phone:* +91 ${phone}` +
    (extra ? `\n\n💬 *Additional Info:* ${extra}` : '') +
    `\n\nLooking forward to hearing from you! 🌸`;

  const url = `https://wa.me/${SANDY_WHATSAPP}?text=${encodeURIComponent(msg)}`;

  // Show success state then open WhatsApp
  document.getElementById('bookingForm').style.display = 'none';
  document.getElementById('modalSuccess').style.display = 'flex';
  window.open(url, '_blank');
}

// ── Reset form ─────────────────────────────────────────────────
function resetForm() {
  state.shootType = null;
  state.location  = null;

  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  document.getElementById('clientName').value    = '';
  document.getElementById('clientPhone').value   = '';
  document.getElementById('clientMessage').value = '';
  document.getElementById('customLocation').value = '';
  document.getElementById('customLocationGroup').style.display = 'none';

  ['shootTypeError','locationError','clientNameError','clientPhoneError'].forEach(id => {
    document.getElementById(id).classList.remove('visible');
  });
}

// ── Keyboard close ─────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
