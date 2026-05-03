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

// ─── Hero Slideshow ───────────────────────────────────────────
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideshowTimer;

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() {
  goToSlide((currentSlide + 1) % slides.length);
}

function startSlideshow() {
  slideshowTimer = setInterval(nextSlide, 4000);
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(slideshowTimer);
    goToSlide(Number(dot.dataset.index));
    startSlideshow();
  });
});

startSlideshow();

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

// ─── Work Card Lightbox ───────────────────────────────────────
const workModal = document.getElementById('work-modal');
const workModalImg = document.getElementById('work-modal-img');
const workModalTitle = document.getElementById('work-modal-title');
const workModalDesc = document.getElementById('work-modal-desc');

function openWorkModal(card) {
  const img = card.querySelector('img');
  workModalImg.src = img.src;
  workModalImg.alt = img.alt;
  workModalTitle.textContent = card.querySelector('h3').textContent;
  workModalDesc.textContent = card.querySelector('p').textContent;
  workModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeWorkModal() {
  workModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('click', () => openWorkModal(card));
});

document.getElementById('work-modal-close').addEventListener('click', closeWorkModal);

workModal.addEventListener('click', e => {
  if (e.target === workModal) closeWorkModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeWorkModal();
});

