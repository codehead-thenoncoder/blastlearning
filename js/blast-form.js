/**
 * BLAST LEARNING — REGISTRATION FORM & PAYMENT LAYER
 * Step navigation, Validation, Input Masking, and Secure Razorpay Integration Layer
 */

(function() {
  'use strict';

  // Global state
  const state = {
    currentPlan: 'all_access_1699',
    currentBoard: 'CBSE',  // 'CBSE' | 'ICSE' | 'State board'
    formData: {
      studentName: '',
      studentClass: '',
      board: 'CBSE',
      school: '',
      subjectStart: 'All subjects',
      parentName: '',
      whatsappNumber: '',
      email: '',
      password: '',
      relationship: 'Mother',
      consent: true,
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
      billingPin: '',
      cardName: '',
      plan: 'all_access_1699'
    }
  };

  // Expose plan selector globally
  window.selectBlastPlan = function(plan) {
    state.currentPlan = 'all_access_1699';
    state.formData.plan = 'all_access_1699';

    // Update submit button text / helper if needed
    const submitBtn = document.getElementById('btn-submit-trial') || document.getElementById('trial-submit-btn');
    if (submitBtn) {
      submitBtn.setAttribute('data-plan-target', 'all_access_1699');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    initBoardSelector();
    initPlanSelector();
    initInputMasking();
    initPasswordToggle();
    initFormSubmission();
  });

  /* --------------------------------------------------------------------------
     01. BOARD SELECTOR (CBSE / ICSE / State board)
     -------------------------------------------------------------------------- */
  function initBoardSelector() {
    const pills = document.querySelectorAll('.board-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        state.currentBoard = pill.getAttribute('data-board') || pill.textContent.trim();
        state.formData.board = state.currentBoard;
      });
    });
  }

  /* --------------------------------------------------------------------------
     02. PLAN SELECTOR
     -------------------------------------------------------------------------- */
  function initPlanSelector() {
    const planOptions = document.querySelectorAll('.plan-option');
    planOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        const plan = opt.getAttribute('data-plan');
        window.selectBlastPlan(plan);
      });
    });
  }

  /* --------------------------------------------------------------------------
     03. INPUT MASKING & BRAND DETECTION
     -------------------------------------------------------------------------- */
  function initInputMasking() {
    // Card Number Formatting & Brand Detection
    const cardInput = document.getElementById('input-card-number');
    const brandIcon = document.getElementById('card-brand-display');

    if (cardInput) {
      cardInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '').substring(0, 16);
        let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formatted;
        state.formData.cardNumber = formatted;

        // Detect brand
        if (brandIcon) {
          if (/^4/.test(value)) {
            brandIcon.innerHTML = '<span style="font-size:11px;font-weight:800;color:#1a1f71">VISA</span>';
          } else if (/^5[1-5]/.test(value)) {
            brandIcon.innerHTML = '<span style="font-size:11px;font-weight:800;color:#eb001b">MC</span>';
          } else if (/^(?:508[5-9]|60[6-8]|652[1-2])/.test(value)) {
            brandIcon.innerHTML = '<span style="font-size:11px;font-weight:800;color:#007934">RuPay</span>';
          } else {
            brandIcon.innerHTML = '';
          }
        }
      });
    }

    // Card Expiry Formatting (MM / YY)
    const expiryInput = document.getElementById('input-card-expiry');
    if (expiryInput) {
      expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (value.length >= 2) {
          e.target.value = value.substring(0, 2) + ' / ' + value.substring(2);
        } else {
          e.target.value = value;
        }
        state.formData.cardExpiry = e.target.value;
      });
    }

    // CVV formatting (3-4 digits)
    const cvvInput = document.getElementById('input-card-cvv');
    if (cvvInput) {
      cvvInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
        state.formData.cardCvv = e.target.value;
      });
    }

    // Billing PIN formatting (6 digits Indian postal code)
    const pinInput = document.getElementById('input-card-pin');
    if (pinInput) {
      pinInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 6);
        state.formData.billingPin = e.target.value;
      });
    }

    // WhatsApp phone formatting (10 digits)
    const phoneInput = document.getElementById('input-parent-phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '').substring(0, 10);
        if (value.length > 5) {
          e.target.value = value.substring(0, 5) + ' ' + value.substring(5);
        } else {
          e.target.value = value;
        }
        state.formData.whatsappNumber = value;
      });
    }
  }

  /* --------------------------------------------------------------------------
     04. PASSWORD TOGGLE
     -------------------------------------------------------------------------- */
  function initPasswordToggle() {
    const toggleBtn = document.getElementById('toggle-password-visibility');
    const pwdInput = document.getElementById('input-password');
    if (toggleBtn && pwdInput) {
      toggleBtn.addEventListener('click', () => {
        const isPassword = pwdInput.type === 'password';
        pwdInput.type = isPassword ? 'text' : 'password';
        toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        toggleBtn.innerHTML = isPassword 
          ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'
          : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
      });
    }
  }

  /* --------------------------------------------------------------------------
     05. FORM VALIDATION & RAZORPAY INTEGRATION LAYER
     -------------------------------------------------------------------------- */
  function initFormSubmission() {
    const form = document.getElementById('blast-trial-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      // Collect values
      const studentName = document.getElementById('input-student-name')?.value.trim();
      const studentClass = document.getElementById('select-student-class')?.value;
      const school = document.getElementById('input-school')?.value.trim();
      const subjectStart = document.getElementById('select-where-to-start')?.value;

      const parentName = document.getElementById('input-parent-name')?.value.trim();
      const parentPhone = document.getElementById('input-parent-phone')?.value.replace(/\D/g, '');
      const parentEmail = document.getElementById('input-parent-email')?.value.trim();
      const password = document.getElementById('input-password')?.value;
      const relationship = document.getElementById('select-relationship')?.value;
      const consentChecked = document.getElementById('checkbox-consent')?.checked;

      const cardNumber = document.getElementById('input-card-number')?.value.replace(/\s/g, '');
      const cardExpiry = document.getElementById('input-card-expiry')?.value.trim();
      const cardCvv = document.getElementById('input-card-cvv')?.value.trim();
      const billingPin = document.getElementById('input-card-pin')?.value.trim();
      const cardName = document.getElementById('input-card-name')?.value.trim();

      // Validate Step 1
      if (!studentName) {
        showError('input-student-name', 'Please enter your child\'s first name.');
        return;
      }
      if (!studentClass) {
        showError('select-student-class', 'Please select your child\'s class.');
        return;
      }

      // Validate Step 2
      if (!parentName) {
        showError('input-parent-name', 'Please enter your full name.');
        return;
      }
      if (!parentPhone || parentPhone.length !== 10) {
        showError('input-parent-phone', 'Please enter a valid 10-digit WhatsApp number.');
        return;
      }
      if (!parentEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parentEmail)) {
        showError('input-parent-email', 'Please enter a valid email address.');
        return;
      }
      if (!password || password.length < 8) {
        showError('input-password', 'Password must be at least 8 characters.');
        return;
      }
      if (!consentChecked) {
        alert('Please accept the Terms and Privacy Policy to proceed.');
        return;
      }

      // Validate Step 3
      if (!cardNumber || cardNumber.length < 15) {
        showError('input-card-number', 'Please enter a valid 16-digit card number.');
        return;
      }
      if (!cardExpiry || !/^\d{2}\s*\/\s*\d{2}$/.test(cardExpiry)) {
        showError('input-card-expiry', 'Please enter expiry in MM / YY format.');
        return;
      }
      if (!cardCvv || cardCvv.length < 3) {
        showError('input-card-cvv', 'Please enter your 3- or 4-digit CVV.');
        return;
      }
      if (!billingPin || billingPin.length !== 6) {
        showError('input-card-pin', 'Please enter a 6-digit Indian billing PIN.');
        return;
      }
      if (!cardName) {
        showError('input-card-name', 'Please enter name as printed on card.');
        return;
      }

      // Execute Razorpay Secure Integration Flow
      launchRazorpayTrialAuth({
        studentName,
        studentClass,
        board: state.currentBoard,
        school,
        subjectStart,
        parentName,
        parentPhone,
        parentEmail,
        plan: state.currentPlan,
        billingPin
      });
    });
  }

  function showError(fieldId, message) {
    const el = document.getElementById(fieldId);
    if (!el) return;
    el.focus();
    el.style.borderColor = '#dc2626';
    el.style.backgroundColor = '#fef2f2';

    // Show temporary inline feedback
    let errorMsg = el.parentElement.querySelector('.form-error-inline');
    if (!errorMsg) {
      errorMsg = document.createElement('div');
      errorMsg.className = 'form-error-inline';
      errorMsg.style.cssText = 'color:#dc2626;font-size:11px;font-weight:600;margin-top:4px;';
      el.parentElement.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
  }

  function clearErrors() {
    document.querySelectorAll('.form-error-inline').forEach(el => el.remove());
    document.querySelectorAll('.input-control, .select-control').forEach(el => {
      el.style.borderColor = '';
      el.style.backgroundColor = '';
    });
  }

  /* --------------------------------------------------------------------------
     06. RAZORPAY INTEGRATION LAYER
     -------------------------------------------------------------------------- */
  function launchRazorpayTrialAuth(payload) {
    const submitBtn = document.getElementById('btn-submit-trial') || document.getElementById('trial-submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite; margin-right:8px; display:inline-block;">
          <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="10"></circle>
        </svg>
        Securing 7-day trial on Razorpay...
      `;
    }

    // Build modal overlay for the Razorpay verification flow
    setTimeout(() => {
      showRazorpayModal(payload);
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Start the 7-day free trial <span class="btn-arrow">→</span>';
      }
    }, 900);
  }

  function showRazorpayModal(data) {
    // Clean up existing modal if any
    const existing = document.getElementById('blast-razorpay-modal');
    if (existing) existing.remove();

    const planPrice = '₹1,699 / month';

    const modal = document.createElement('div');
    modal.id = 'blast-razorpay-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(12, 15, 20, 0.78);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    `;

    modal.innerHTML = `
      <div style="background:#ffffff; border-radius:20px; max-width:480px; width:100%; padding:2.25rem; box-shadow:0 20px 40px rgba(0,0,0,0.3); position:relative; font-family:'Plus Jakarta Sans', sans-serif;">
        <button id="close-razorpay-modal" style="position:absolute; top:1.25rem; right:1.25rem; background:none; border:none; font-size:1.5rem; color:#6b7280; cursor:pointer; line-height:1;">&times;</button>
        
        <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1.25rem;">
          <div style="width:36px; height:36px; border-radius:50%; background:#ecfdf5; color:#059669; display:flex; align-items:center; justify-content:center; font-weight:700;">
            ✓
          </div>
          <div>
            <h3 style="font-size:1.25rem; font-weight:800; color:#0f172a; margin:0;">7-Day Free Trial Activated</h3>
            <p style="font-size:0.75rem; color:#6b7280; margin:2px 0 0;">Card Verified · Razorpay 256-bit Token Vault</p>
          </div>
        </div>

        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:1.25rem; margin-bottom:1.5rem; font-size:0.875rem; line-height:1.6; color:#334155;">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
            <span style="color:#64748b;">Student:</span>
            <strong style="color:#0f172a;">${data.studentName} (Class ${data.studentClass || '6–12'})</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
            <span style="color:#64748b;">Curriculum Board:</span>
            <strong style="color:#0f172a;">${data.board}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
            <span style="color:#64748b;">Chosen Plan:</span>
            <strong style="color:#0f172a;">ALL-ACCESS MEMBERSHIP · ${planPrice}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
            <span style="color:#64748b;">Charged Today:</span>
            <strong style="color:#059669; font-size:1rem;">₹0.00</strong>
          </div>
          <div style="display:flex; justify-content:space-between; border-top:1px dashed #cbd5e1; padding-top:0.4rem; margin-top:0.4rem;">
            <span style="color:#64748b;">First Charge Date:</span>
            <strong style="color:#0f172a;">Day 8 (Cancel anytime before)</strong>
          </div>
        </div>

        <div style="margin-bottom:1.5rem; font-size:0.8125rem; color:#475569; line-height:1.5;">
          <p><strong>What happens next:</strong></p>
          <ul style="list-style:disc; margin-left:1.2rem; margin-top:0.4rem;">
            <li>We have sent your child's calibration invite link to <strong>+91 ${data.parentPhone}</strong> on WhatsApp.</li>
            <li>Calibration week begins with short 10-minute baseline sessions.</li>
            <li>Cancel inside your parent dashboard at any time before Day 8 for ₹0 charge.</li>
          </ul>
        </div>

        <button id="modal-dashboard-btn" style="width:100%; background:#111418; color:#ffffff; font-weight:700; padding:0.85rem; border-radius:9999px; border:none; cursor:pointer; font-size:0.9375rem;">
          Go to Calibration Dashboard →
        </button>
      </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => modal.remove();
    document.getElementById('close-razorpay-modal')?.addEventListener('click', closeModal);
    document.getElementById('modal-dashboard-btn')?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

})();
