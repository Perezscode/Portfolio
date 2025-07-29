// MOBILE MENU TOGGLE
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('hidden');
});

// SCROLL TO TOP BUTTON
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn?.classList.remove('hidden');
  } else {
    scrollTopBtn?.classList.add('hidden');
  }
});

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// FADE-IN SECTIONS ON SCROLL
const fadeInElements = document.querySelectorAll('.fade-in');

const fadeInObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('opacity-100', 'translate-y-0');
      entry.target.classList.remove('opacity-0', 'translate-y-10');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

fadeInElements.forEach(el => {
  el.classList.add('opacity-0', 'translate-y-10', 'transition', 'duration-700');
  fadeInObserver.observe(el);
});

// IMAGE TILT EFFECT ON HOVER (for project cards)
document.querySelectorAll('.group').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${y * 8}deg) rotateY(${x * 8}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
});

// SMOOTH SCROLL FOR ANCHORS
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// AUTO-HIDE NAVBAR ON SCROLL (Desktop)
let lastScrollTop = 0;
const navbar = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (window.innerWidth > 768) {
    if (currentScroll > lastScrollTop) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
  }
  lastScrollTop = currentScroll;
});

// FORM SUBMIT SUCCESS HANDLING
const contactForm = document.querySelector('#contact-form');
const statusMessage = document.querySelector('#form-status');

contactForm?.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(contactForm);

  fetch(contactForm.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    statusMessage.classList.remove('hidden');
    setTimeout(() => {
      statusMessage.classList.add('opacity-100');
    }, 10);

    if (response.ok) {
      statusMessage.textContent = 'Message sent successfully! I will get back to you as soon as possible.';
      statusMessage.classList.remove('text-red-600');
      contactForm.reset();
    } else {
      statusMessage.textContent = 'Something went wrong. Please try again.';
      statusMessage.classList.add('text-red-600');
    }
  })
  .catch(error => {
    statusMessage.classList.remove('hidden');
    setTimeout(() => {
      statusMessage.classList.add('opacity-100');
    }, 10);
    
    statusMessage.textContent = 'Error: Unable to send message.';
    statusMessage.classList.add('text-red-600');
  });
});

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  const galleryImages = document.querySelectorAll(".gallery-img");

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.remove("hidden");
    });
  });

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightboxImg.src = "";
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === closeBtn) {
      closeLightbox();
    }
  });
});



