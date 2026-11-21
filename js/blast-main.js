/**
 * BLAST LEARNING — MAIN INTERACTION CONTROLLER
 * Smooth navigation, Mobile drawer, Interactive Goldilocks curve, Timeline & Pricing sync
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initSmoothScroll();
  initGoldilocksInteractive();
  initPricingFormSync();
});

/* --------------------------------------------------------------------------
   01. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  if (!toggleBtn || !drawer) return;

  function toggleMenu(isOpen) {
    const nextState = typeof isOpen === 'boolean' ? isOpen : !drawer.classList.contains('is-open');
    toggleBtn.setAttribute('aria-expanded', String(nextState));
    drawer.classList.toggle('is-open', nextState);
    document.body.style.overflow = nextState ? 'hidden' : '';
  }

  toggleBtn.addEventListener('click', () => toggleMenu());

  // Close drawer on link click
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close drawer on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      toggleMenu(false);
    }
  });
}

/* --------------------------------------------------------------------------
   02. SMOOTH ANCHOR SCROLLING WITH OFFSET
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const navHeight = 76;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   03. INTERACTIVE LEARNING GOLDILOCKS ZONE
   -------------------------------------------------------------------------- */
function initGoldilocksInteractive() {
  const container = document.querySelector('.goldilocks-graphic-container');
  if (!container) return;

  const marker = container.querySelector('#goldilocks-marker');
  const tooltip = container.querySelector('#goldilocks-tooltip');
  const tooltipText = container.querySelector('#goldilocks-tooltip-text');
  const zones = container.querySelectorAll('.goldilocks-zone-trigger');

  const zoneData = {
    'too-easy': {
      cx: 80,
      cy: 160,
      title: 'Boredom Zone',
      desc: 'No cognitive tension. Student memorizes without deep consolidation.'
    },
    'goldilocks': {
      cx: 240,
      cy: 50,
      title: 'The Goldilocks Zone',
      desc: 'Optimal 85% success rate. High engagement, deep durable mastery.'
    },
    'too-hard': {
      cx: 400,
      cy: 160,
      title: 'Frustration Zone',
      desc: 'Cognitive overload. Anxiety builds, leading to dropout and dread.'
    }
  };

  zones.forEach(zone => {
    zone.addEventListener('click', () => {
      const type = zone.getAttribute('data-zone');
      if (zoneData[type] && marker) {
        marker.setAttribute('cx', zoneData[type].cx);
        marker.setAttribute('cy', zoneData[type].cy);

        if (tooltip && tooltipText) {
          tooltipText.textContent = `${zoneData[type].title}: ${zoneData[type].desc}`;
          tooltip.style.opacity = '1';
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   04. PRICING CARDS TO REGISTRATION FORM PLAN SYNC
   -------------------------------------------------------------------------- */
function initPricingFormSync() {
  const pricingButtons = document.querySelectorAll('.pricing-card [data-select-plan]');
  pricingButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const plan = btn.getAttribute('data-select-plan');
      if (window.selectBlastPlan) {
        window.selectBlastPlan(plan);
      }
    });
  });
}
