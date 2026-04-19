// ─── Navigation ──────────────────────────────────────────────
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const hamburger = document.getElementById('hamburger');

function showPage(pageId) {
  pages.forEach(p => p.classList.remove('active'));
  navLinks.forEach(l => l.classList.remove('active'));

  const targetPage = document.getElementById('page-' + pageId);
  if (targetPage) targetPage.classList.add('active');

  const targetLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
  if (targetLink) targetLink.classList.add('active');

  // Scroll content to top
  document.getElementById('content').scrollTo(0, 0);
  window.scrollTo(0, 0);

  // Close sidebar on mobile
  closeSidebar();
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showPage(link.dataset.page);
  });
});

// Hero "Get in Touch" button
document.querySelectorAll('[data-page]').forEach(el => {
  if (!el.classList.contains('nav-link')) {
    el.addEventListener('click', e => {
      e.preventDefault();
      showPage(el.dataset.page);
    });
  }
});

// ─── Mobile Sidebar ───────────────────────────────────────────
function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('open');
}

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
});

overlay.addEventListener('click', closeSidebar);

// ─── Contact Form ─────────────────────────────────────────────
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');
const errorMsg = document.getElementById('form-error');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const btnLoading = document.getElementById('btn-loading');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Reset messages
  successMsg.classList.add('hidden');
  errorMsg.classList.add('hidden');

  // Show loading state
  btnText.classList.add('hidden');
  btnLoading.classList.remove('hidden');
  submitBtn.disabled = true;

  const payload = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
    vehicle: form.vehicle.value.trim(),
    message: form.message.value.trim(),
  };

  try {
    const res = await fetch('/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      successMsg.classList.remove('hidden');
      form.reset();
    } else {
      errorMsg.classList.remove('hidden');
    }
  } catch (err) {
    errorMsg.classList.remove('hidden');
  } finally {
    btnText.classList.remove('hidden');
    btnLoading.classList.add('hidden');
    submitBtn.disabled = false;
  }
});
