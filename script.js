const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

// If the portrait file is missing, retain the initials placeholder.
const profilePhoto = document.getElementById('profilePhoto');
const portraitPlaceholder = document.getElementById('portraitPlaceholder');
profilePhoto.addEventListener('load', () => {
  profilePhoto.style.display = 'block';
  portraitPlaceholder.style.display = 'none';
});
profilePhoto.addEventListener('error', () => {
  profilePhoto.style.display = 'none';
  portraitPlaceholder.style.display = 'flex';
});
if (profilePhoto.complete && profilePhoto.naturalWidth > 0) {
  profilePhoto.style.display = 'block';
  portraitPlaceholder.style.display = 'none';
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(item => observer.observe(item));

document.getElementById('year').textContent = new Date().getFullYear();

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const closeLightbox = () => {
  lightbox.classList.remove('open');
  lightboxImage.src = '';
  document.body.style.overflow = '';
};
document.querySelectorAll('.certificate-card').forEach(card => {
  card.addEventListener('click', () => {
    lightboxImage.src = card.dataset.image;
    lightboxImage.alt = card.dataset.title;
    lightboxTitle.textContent = card.dataset.title;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeLightbox();
});