/* ====================================================================
   BLAST LEARNING — STUDY GUIDE
   MASTER JAVASCRIPT CONTROLLER
   Choreography, Interactive Sandboxes, Micro-Interactions, Form Logic
   Locked Site Chrome Mobile Toggle + Refined Hero Animations
   ==================================================================== */

/* --- Elementor-Safe Initialization Controller --- */
function initStudyGuide() {
  initWaveformBars();
  checkUrlParamsForRole();
  initFaqAccordion();
  runHeroEntranceChoreography();
  initTutorWorkflow();
  if (typeof initLockedHeaderMobileToggle === 'function') {
    initLockedHeaderMobileToggle();
  }
}

// Executes immediately if DOM is already interactive/complete (Elementor/AJAX safe)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStudyGuide);
} else {
  initStudyGuide();
}

/* --- Locked Elementor Header Mobile Menu Toggle --- */
function initLockedHeaderMobileToggle() {
  const toggleBtn = document.querySelector('.elementor-55 .elementor-menu-toggle');
  const dropdownNav = document.querySelector('.elementor-55 .elementor-nav-menu--dropdown');
  if (toggleBtn && dropdownNav) {
    toggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const isActive = toggleBtn.classList.toggle('is-active');
      dropdownNav.classList.toggle('is-active');
      toggleBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Close when clicking any link inside dropdown
    const dropLinks = dropdownNav.querySelectorAll('a');
    dropLinks.forEach(link => {
      link.addEventListener('click', function() {
        toggleBtn.classList.remove('is-active');
        dropdownNav.classList.remove('is-active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* --- Hero Controlled Motion System (Choreography, Stationary Ambient Float & Parallax) --- */
function runHeroEntranceChoreography() {
  if (typeof gsap === 'undefined') {
    // Poll briefly if GSAP CDN is loading asynchronously or deferred
    let attempts = 0;
    const gsapInterval = setInterval(function() {
      attempts++;
      if (typeof gsap !== 'undefined') {
        clearInterval(gsapInterval);
        runHeroEntranceChoreography();
      } else if (attempts > 30) {
        clearInterval(gsapInterval);
      }
    }, 100);
    return;
  }

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) {
    return;
  }

  // Initial offsets for entrance choreography (headline, copy, CTA, composition)
  gsap.set(['#h1Line1', '#h1Line2', '#h1Line3', '#h1Line4'], { y: '108%' });
  gsap.set('#heroLead', { opacity: 0, y: 16 });
  gsap.set('#heroActions', { opacity: 0, y: 18 });
  gsap.set('#heroImageFrame', { opacity: 0, y: 32, scale: 0.96 });
  gsap.set('#heroUnderlay', { opacity: 0, x: -24, y: 16, rotation: -6 });
  gsap.set('#heroFragment1', { opacity: 0, x: -28, y: -20, rotation: -10 });
  gsap.set('#heroPodcastChip', { opacity: 0, y: -16, scale: 0.95 });
  gsap.set('#heroProductPanel', { opacity: 0, y: 22, scale: 0.95 });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // STEP 1: Hero typography reveals line-by-line
  tl.to('#h1Line1', { y: '0%', duration: 0.65 })
    .to('#h1Line2', { y: '0%', duration: 0.65 }, '-=0.52')
    .to('#h1Line3', { y: '0%', duration: 0.65 }, '-=0.52')
    .to('#h1Line4', { y: '0%', duration: 0.65 }, '-=0.52')

  // STEP 2: Main hero image enters slightly offset & settles
    .to('#heroImageFrame', { opacity: 1, y: 0, scale: 1, duration: 0.8 }, '-=0.75')

  // STEP 3: Secondary layers and small product UI elements settle
    .to('#heroUnderlay', { opacity: 1, x: 0, y: 0, rotation: -3, duration: 0.75, ease: 'power2.out' }, '-=0.65')
    .to('#heroFragment1', { opacity: 1, x: 0, y: 0, rotation: -4.5, duration: 0.7, ease: 'back.out(1.2)' }, '-=0.65')
    .to('#heroPodcastChip', { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.15)' }, '-=0.55')
    .to('#heroProductPanel', { opacity: 1, y: 0, scale: 1, duration: 0.65 }, '-=0.5')

  // STEP 4: Supporting copy & CTA appear smoothly into stable composition
    .to('#heroLead', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.45')
    .to('#heroActions', { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.45');

  // CONTINUOUS AMBIENT BREATH on stationary frame badges
  initHeroStationaryAmbientMotion();

  // DESKTOP MOUSE-BASED PARALLAX (Only on focal composition layers, never on moving wave layer or text)
  initHeroMouseParallax();

  // SCROLL PARALLAX (Only on focal composition layers, wave elements travel independently)
  initHeroScrollParallax();
}

function initHeroStationaryAmbientMotion() {
  if (typeof gsap === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Physical note fragment breath
  gsap.to('#heroFragment1', {
    y: '-=4',
    rotation: '-=0.6',
    duration: 3.6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 1.5
  });

  // Podcast badge gentle float
  gsap.to('#heroPodcastChip', {
    y: '-=3',
    duration: 3.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 1.6
  });
}

function initHeroMouseParallax() {
  if (typeof gsap === 'undefined') return;
  // Strictly desktop only (fine pointer, hover-capable)
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const heroSec = document.getElementById('hero');
  if (!heroSec) return;

  heroSec.addEventListener('mousemove', function(e) {
    const rect = heroSec.getBoundingClientRect();
    const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    // Hero Image & Underlay (6-8px moderate movement)
    gsap.to('#heroImageFrame', {
      x: nx * 7,
      y: ny * 7,
      duration: 0.65,
      ease: 'power1.out',
      overwrite: 'auto'
    });
    gsap.to('#heroUnderlay', {
      x: nx * 5,
      y: ny * 5,
      duration: 0.7,
      ease: 'power1.out',
      overwrite: 'auto'
    });

    // Small Foreground UI Elements (10-14px depth shift)
    gsap.to('#heroFragment1', {
      x: nx * 12,
      y: ny * 12,
      duration: 0.55,
      ease: 'power1.out',
      overwrite: 'auto'
    });
    gsap.to('#heroPodcastChip', {
      x: nx * 10,
      y: ny * 10,
      duration: 0.55,
      ease: 'power1.out',
      overwrite: 'auto'
    });
    gsap.to('#heroProductPanel', {
      x: nx * 13,
      y: ny * 13,
      duration: 0.55,
      ease: 'power1.out',
      overwrite: 'auto'
    });
  });

  heroSec.addEventListener('mouseleave', function() {
    gsap.to([
      '#heroImageFrame',
      '#heroUnderlay',
      '#heroFragment1',
      '#heroPodcastChip',
      '#heroProductPanel'
    ], {
      x: 0,
      y: 0,
      duration: 0.9,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });
}

function initHeroScrollParallax() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.timeline({
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6
    }
  })
  // Main hero image subtly scales down and translates
  .to('#heroImageFrame', { y: -35, scale: 0.97, ease: 'none' }, 0)
  .to('#heroUnderlay', { y: -20, rotation: -4.5, ease: 'none' }, 0)
  // Foreground UI shifts at varying optical depths
  .to('#heroFragment1', { y: -55, x: 10, ease: 'none' }, 0)
  .to('#heroPodcastChip', { y: -40, ease: 'none' }, 0)
  .to('#heroProductPanel', { y: -25, ease: 'none' }, 0);
}

/* --- Product Walkthrough Modal --- */
function openWalkthrough() {
  const modal = document.getElementById('walkthroughModal');
  const video = document.getElementById('walkthroughVideoPlayer');
  if (modal) {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (video) video.play().catch(() => {});
  }
}
function closeWalkthrough() {
  const modal = document.getElementById('walkthroughModal');
  const video = document.getElementById('walkthroughVideoPlayer');
  if (modal) {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    if (video) video.pause();
  }
}

/* --- Role Selection & URL Parameter Handling --- */
function setFormRole(role) {
  const sel = document.getElementById('roleSelect');
  if (sel) {
    for (let i = 0; i < sel.options.length; i++) {
      if (sel.options[i].value === role || sel.options[i].text === role) {
        sel.selectedIndex = i;
        handleRoleSelectionChange(sel);
        break;
      }
    }
  }
}

function handleRoleSelectionChange(sel) {
  const prepGroup = document.getElementById('prepGoalFieldGroup');
  if (prepGroup) {
    if (sel.value === 'Tutor or teacher') {
      prepGroup.style.display = 'none';
    } else {
      prepGroup.style.display = '';
    }
  }
}

function checkUrlParamsForRole() {
  try {
    const params = new URLSearchParams(window.location.search);
    const role = params.get('role');
    if (role) {
      if (role.toLowerCase().includes('tutor') || role.toLowerCase().includes('teacher')) {
        setFormRole('Tutor or teacher');
      } else if (role.toLowerCase().includes('parent')) {
        setFormRole('Parent');
      } else {
        setFormRole('Student');
      }
    }
  } catch(e) {}
}

/* ====================================================================
   ACT 8: PACING & PROGRESS VISUAL STORY (SCROLL-TRIGGERED & INTERACTIVE)
   ==================================================================== */
/* --- Act 7: For Tutors & Teachers 3-Step Interactive Workflow --- */
function initTutorWorkflow() {
  const tutorSection = document.getElementById('tutors');
  if (!tutorSection) return;

  const stepItems = tutorSection.querySelectorAll('.tutor-step-item');
  const panels = tutorSection.querySelectorAll('.tutor-visual-panel');

  function activateStep(stepNum) {
    stepItems.forEach(item => {
      const match = item.getAttribute('data-step') === String(stepNum);
      item.classList.toggle('is-active', match);
      item.setAttribute('aria-selected', match ? 'true' : 'false');
    });

    panels.forEach(panel => {
      const match = panel.getAttribute('data-panel') === String(stepNum);
      panel.classList.toggle('is-active', match);
    });
  }

  stepItems.forEach(item => {
    const stepNum = item.getAttribute('data-step');
    item.addEventListener('click', () => activateStep(stepNum));
    item.addEventListener('mouseenter', () => activateStep(stepNum));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateStep(stepNum);
      }
    });
  });
}

/* --- Audio Podcast Interactive Sandbox --- */
let isAudioPlaying = false;
let audioTimerInterval = null;
let currentSeconds = 0;
const totalSeconds = 348; // 5:48

function initWaveformBars() {
  const container = document.getElementById('waveformContainer');
  if (!container) return;
  container.innerHTML = '';
  const barHeights = [10, 14, 18, 12, 22, 16, 24, 14, 20, 12, 18, 22, 15, 12, 19, 14, 21, 13, 17, 10];
  barHeights.forEach((h, idx) => {
    const bar = document.createElement('div');
    bar.className = 'wave-bar';
    bar.style.height = h + 'px';
    bar.setAttribute('data-orig-h', h);
    bar.id = 'waveBar_' + idx;
    container.appendChild(bar);
  });
}

function toggleAudioPodcast() {
  isAudioPlaying = !isAudioPlaying;
  const btn = document.getElementById('btnPlayPodcast');
  const timer = document.getElementById('podcastTimer');
  const icon = document.getElementById('playIconSvg');

  if (isAudioPlaying) {
    if (icon) {
      icon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
    }
    audioTimerInterval = setInterval(() => {
      currentSeconds++;
      if (currentSeconds > totalSeconds) currentSeconds = 0;
      const mins = Math.floor(currentSeconds / 60);
      const secs = currentSeconds % 60;
      if (timer) timer.textContent = mins + ':' + (secs < 10 ? '0' : '') + secs + ' / 5:48';

      // Animate active waveform bars
      const activeIdx = Math.floor((currentSeconds % 20));
      for (let i = 0; i < 20; i++) {
        const bar = document.getElementById('waveBar_' + i);
        if (bar) {
          if (i <= activeIdx) {
            bar.classList.add('active');
            bar.style.height = (12 + Math.floor(Math.random() * 12)) + 'px';
          } else {
            bar.classList.remove('active');
            bar.style.height = bar.getAttribute('data-orig-h') + 'px';
          }
        }
      }
    }, 1000);
  } else {
    if (icon) {
      icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
    }
    clearInterval(audioTimerInterval);
  }
}

/* --- Teacher Emphasis & Learning Gap Dynamic Equalizer --- */
function updateEqualizer() {
  const teacherVal = parseInt(document.getElementById('sliderTeacher').value, 10);
  const gapVal = parseInt(document.getElementById('sliderGap').value, 10);
  
  const teacherEl = document.getElementById('teacherVal');
  const gapEl = document.getElementById('gapVal');
  const resultBadge = document.getElementById('eqResultBadge');

  if (teacherEl) teacherEl.textContent = teacherVal + '%';
  if (gapEl) gapEl.textContent = gapVal + '%';

  // Dynamic formula: more emphasis + more gap = more review sessions
  const combined = (teacherVal * 0.6) + (gapVal * 0.4);
  let sessions = 1;
  if (combined > 70) sessions = 4;
  else if (combined > 50) sessions = 3;
  else if (combined > 30) sessions = 2;

  if (resultBadge) {
    resultBadge.textContent = 'Calculated Study Time: +' + sessions + ' Targeted Revision Session' + (sessions > 1 ? 's' : '') + ' & Deep-Thinking Transfer';
  }
}

/* --- FAQ Accordion --- */
function initFaqAccordion() {
  const studyGuideRoot = document.querySelector('#study-guide-page');
  const faqItems = studyGuideRoot ? studyGuideRoot.querySelectorAll('[data-faq-item]') : document.querySelectorAll('[data-faq-item]');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        // Close others
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('is-open');
            const otherBtn = other.querySelector('.faq-trigger');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });
        // Toggle current
        if (isOpen) {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
}

/* --- Registration Form Lead Validation & Submission --- */
function handleLeadSubmit(event) {
  event.preventDefault();

  const form = document.getElementById('leadCaptureForm');
  const honeypot = document.getElementById('honeypotField');
  if (honeypot && honeypot.value.trim() !== '') {
    // Spambot trapped silently
    return;
  }

  const nameInput = document.getElementById('fullNameInput');
  const emailInput = document.getElementById('emailInput');
  const phoneInput = document.getElementById('phoneInput');
  const termsCheck = document.getElementById('termsCheck');
  const roleSelect = document.getElementById('roleSelect');
  const prepGoalInput = document.getElementById('prepGoalInput');

  let isValid = true;

  // Name validation
  if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
    nameInput.classList.add('is-invalid');
    isValid = false;
  } else {
    nameInput.classList.remove('is-invalid');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    emailInput.classList.add('is-invalid');
    isValid = false;
  } else {
    emailInput.classList.remove('is-invalid');
  }

  // Indian mobile validation (10 digits starting with 6, 7, 8, or 9)
  const cleanedPhone = phoneInput.value.trim().replace(/\D/g, '');
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(cleanedPhone)) {
    phoneInput.classList.add('is-invalid');
    isValid = false;
  } else {
    phoneInput.classList.remove('is-invalid');
  }

  // Terms check
  if (!termsCheck.checked) {
    termsCheck.focus();
    isValid = false;
  }

  if (!isValid) return;

  // Visual submission feedback
  const btnSubmit = document.getElementById('btnSubmitForm');
  btnSubmit.disabled = true;
  btnSubmit.textContent = 'Activating Free Trial...';

  /*
   * BACKEND DESTINATION INTEGRATION HOOK:
   * The approved prototype uses client-side validation followed by visual confirmation.
   * To connect this to WordPress REST API, Admin AJAX, or external CRM (Zapier/Make/Webhook),
   * replace the setTimeout block below with an authentic HTTP request:
   *
   * const payload = {
   *   name: nameInput.value.trim(),
   *   email: emailInput.value.trim(),
   *   phone: cleanedPhone,
   *   role: roleSelect ? roleSelect.value : 'Student',
   *   prep_goal: prepGoalInput ? prepGoalInput.value : '',
   *   updates_consent: document.getElementById('updatesCheck') ? document.getElementById('updatesCheck').checked : false
   * };
   * 
   * fetch('/wp-json/blastlearning/v1/register-trial', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify(payload)
   * }).then(res => res.json()).then(data => { ... });
   */

  setTimeout(() => {
    const successAlert = document.getElementById('formSuccessAlert');
    if (successAlert) {
      successAlert.innerHTML = '<strong>Welcome to Study Guide!</strong> Your free two-week trial has been registered for ' + nameInput.value.trim() + '. A confirmation has been sent to ' + emailInput.value.trim() + ' with login instructions.';
      successAlert.style.display = 'block';
    }
    form.style.display = 'none';
  }, 1000);
}
