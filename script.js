/* ============================================================
   SANJAEL RAJA M — PORTFOLIO JAVASCRIPT
   Engineered interactions, tracking mouse algorithms and animations
   ============================================================ */

// 1. PRELOADER CONTROLLER
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.classList.add('loaded');
    // Trigger progress bars on load in case they're already in view
    animateProgressBars();
  }, 1600);
});

// 2. CUSTOM CURSOR TRACKER (PRECISE DOT + RING INTERACTION - HIGH PERFORMANCE)
const cursor = document.getElementById('custom-cursor');
const dot = cursor.querySelector('.cursor-dot');
const ring = cursor.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // Set inner dot instantly
  dot.style.left = `${mouseX}px`;
  dot.style.top = `${mouseY}px`;
});

// Smooth Lerp for cursor outer ring
function updateCursorRing() {
  const lerpFactor = 0.15;
  ringX += (mouseX - ringX) * lerpFactor;
  ringY += (mouseY - ringY) * lerpFactor;
  
  ring.style.left = `${ringX}px`;
  ring.style.top = `${ringY}px`;
  
  requestAnimationFrame(updateCursorRing);
}
requestAnimationFrame(updateCursorRing);

// Handle cursor hover states
const hoverableElements = document.querySelectorAll('a, button, .tech-icon-card, .project-card, .achievement-card, .channel-card, .hobby-tag, .stat-card');
hoverableElements.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('hovering-link');
  });
  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('hovering-link');
  });
});

// 3. NAVBAR GLASS SCROLL EFFECT & SCROLL PROGRESS GAUGE
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
  animateProgressBars();
  updateScrollProgress();
});

// 4. HAMBURGER NAVIGATION DRAWER
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav drawer on click
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active section detector
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    
    if (scrollPosition >= top && scrollPosition < top + height) {
      document.querySelectorAll('.nav-link').forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// 5. ROLE TYPEWRITER ENGINE
const roles = [
  'Full-Stack Developer',
  'AI & Data Science Student',
  'DevOps Enthusiast',
  'React.js Developer',
  'Problem Solver'
];
let currentRoleIdx = 0;
let currentCharIdx = 0;
let isDeletingChar = false;
const dynamicRoleEl = document.getElementById('role-dynamic');

function handleTypewriter() {
  const fullText = roles[currentRoleIdx];
  
  if (isDeletingChar) {
    dynamicRoleEl.textContent = fullText.substring(0, currentCharIdx - 1);
    currentCharIdx--;
  } else {
    dynamicRoleEl.textContent = fullText.substring(0, currentCharIdx + 1);
    currentCharIdx++;
  }

  let delay = isDeletingChar ? 40 : 80;

  if (!isDeletingChar && currentCharIdx === fullText.length) {
    isDeletingChar = true;
    delay = 1800; // Pause showing full text
  } else if (isDeletingChar && currentCharIdx === 0) {
    isDeletingChar = false;
    currentRoleIdx = (currentRoleIdx + 1) % roles.length;
    delay = 300; // Pause before starting next word
  }

  setTimeout(handleTypewriter, delay);
}
setTimeout(handleTypewriter, 1500);

// 6. HERO BACKGROUND FLOATING PARTICLES
const particlesContainer = document.getElementById('particles');
const maxParticles = 25;

for (let i = 0; i < maxParticles; i++) {
  generateHeroParticle();
}

function generateHeroParticle() {
  const p = document.createElement('div');
  p.className = 'particle';
  
  const size = Math.random() * 4 + 2; // 2px to 6px
  const startX = Math.random() * 100;
  const startY = Math.random() * 100;
  const opacity = Math.random() * 0.15 + 0.05;
  const duration = Math.random() * 20 + 10;
  
  p.style.width = `${size}px`;
  p.style.height = `${size}px`;
  p.style.left = `${startX}%`;
  p.style.top = `${startY}%`;
  p.style.opacity = opacity;
  
  // Drift path simulation
  p.animate([
    { transform: 'translate(0, 0)' },
    { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * -150 - 50}px)` }
  ], {
    duration: duration * 1000,
    iterations: Infinity,
    direction: 'alternate',
    easing: 'ease-in-out'
  });

  particlesContainer.appendChild(p);
}

// 7. ANIMATE TECHNICAL PROGRESS BARS (TRIGGERED ON SCROLL VISIBILITY)
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar-fill');
  progressBars.forEach((bar) => {
    const rect = bar.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isVisible && bar.style.width === '0%') {
      const targetPercent = bar.getAttribute('data-percentage');
      bar.style.width = `${targetPercent}%`;
    }
  });
}

// 8. SCROLL REVEAL OBSERVER
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.05,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.about-portrait-card, .info-card, .about-career-goal, .about-hobbies, .tech-icon-card, .additional-skills-card, .service-card, .timeline-content, .project-card, .achievement-card, .cert-card, .edu-card, .channel-card, .contact-form-panel, .stat-card').forEach((el) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// 9. PROJECTS PORTFOLIO CATEGORY FILTER
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Reset buttons active state
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const selectedFilter = btn.getAttribute('data-filter');

    projectCards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category');
      
      if (selectedFilter === 'all' || cardCategory === selectedFilter) {
        card.classList.remove('hide');
        card.animate([
          { opacity: 0, transform: 'scale(0.95)' },
          { opacity: 1, transform: 'scale(1)' }
        ], {
          duration: 350,
          easing: 'ease-out',
          fill: 'forwards'
        });
      } else {
        card.classList.add('hide');
      }
    });
  });
});

// 10. CONTACT FORM SUBMISSION ANCHOR
function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = document.getElementById('contact-form');
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnContent = submitBtn.innerHTML;

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Transmitting...</span>';
  
  // Simulate API contact transmit latency
  setTimeout(() => {
    form.reset();
    submitBtn.style.background = 'linear-gradient(135deg, #00C897 0%, #008060 100%)';
    submitBtn.innerHTML = '<span>Message Transmitted Successfully!</span>';
    
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
      submitBtn.style.background = '';
    }, 3000);
  }, 1500);
}

// 11. TOP SCROLL PROGRESS & BACK TO TOP BUTTON LOGIC
const scrollProgress = document.getElementById('scroll-progress');
const backToTopBtn = document.getElementById('back-to-top');
const scrollCircle = document.getElementById('scroll-circle');

function updateScrollProgress() {
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (totalHeight <= 0) return;
  
  const progressPercent = (window.scrollY / totalHeight) * 100;
  
  // Top progress bar update
  if (scrollProgress) {
    scrollProgress.style.width = `${progressPercent}%`;
  }
  
  // Back to top button visibility & circular progress gauge update
  if (backToTopBtn) {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
  
  if (scrollCircle) {
    const progress = window.scrollY / totalHeight;
    const offset = 283 - (progress * 283);
    scrollCircle.style.strokeDashoffset = offset;
  }
}

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// 12. INTERACTIVE MAGNETIC ELEMENTS
const magneticElements = document.querySelectorAll('.magnetic');
magneticElements.forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0px, 0px)';
  });
});

// 13. CARD SPOTLIGHT EFFECT (RADIAL GRAD HOVER COORDINATES)
const spotlightCards = document.querySelectorAll('.spotlight-card');
spotlightCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});
