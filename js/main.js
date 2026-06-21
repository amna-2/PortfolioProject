/* =========================================================
   ASIA HOLDINGS — main.js
   Shared behavior across all pages.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Header: solid on scroll ---------- */
  var header = document.getElementById('site-header');
  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 12) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  /* ---------- Mobile menu toggle ---------- */
  var menuBtn = document.getElementById('menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  var iconOpen = document.getElementById('icon-open');
  var iconClose = document.getElementById('icon-close');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      var isHidden = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      if (iconOpen && iconClose) {
        iconOpen.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');
      }
      menuBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    });

    // Close mobile menu when a link is tapped
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        if (iconOpen && iconClose) {
          iconOpen.classList.remove('hidden');
          iconClose.classList.add('hidden');
        }
      });
    });
  }

  /* ---------- Active nav link (auto-detect current page) ---------- */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Contact form (front-end only) ---------- */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = contactForm.querySelector('#name');
      var email = contactForm.querySelector('#email');
      var message = contactForm.querySelector('#message');
      var statusEl = document.getElementById('form-status');
      var isValid = true;

      [name, email, message].forEach(function (field) {
        if (field && !field.value.trim()) {
          field.classList.add('border-gold');
          isValid = false;
        } else if (field) {
          field.classList.remove('border-gold');
        }
      });

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailPattern.test(email.value.trim())) {
        isValid = false;
        email.classList.add('border-gold');
      }

      if (!statusEl) return;

      if (!isValid) {
        statusEl.textContent = 'Please fill in every field with a valid email address.';
        statusEl.classList.remove('hidden', 'text-gold');
        statusEl.classList.add('text-red-400');
        return;
      }

      // No backend is wired up yet — this just confirms the form works.
      // Connect this to a service like Formspree, EmailJS, or your own
      // endpoint to actually receive submissions.
      statusEl.textContent = 'Thank you, ' + name.value.split(' ')[0] + '. Your message has been noted — we will be in touch shortly.';
      statusEl.classList.remove('hidden', 'text-red-400');
      statusEl.classList.add('text-gold');
      contactForm.reset();
    });
  }

});
