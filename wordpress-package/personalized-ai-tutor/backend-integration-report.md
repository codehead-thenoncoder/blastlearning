# Blast Learning — Personalized AI Tutor Backend Integration Report

This document details the backend architectural audit of the live Blast Learning website (`https://blastlearning.in/`), examines the existing lead capture and registration mechanics, evaluates payment security requirements, and outlines the production integration paths for the on-page registration form in `landing-page-elementor.html`.

---

## 1. Executive Summary & Core Findings

1. **Live Site Inspection**:
   - The production WordPress environment (`https://blastlearning.in/`) is running WordPress with the **Hello Elementor** theme and **Elementor Pro Theme Builder**.
   - **No native WordPress form plugin** (such as Contact Form 7, WPForms, Gravity Forms, Ninja Forms, or Fluent Forms) is currently active or handling user registrations on the website.
   - On the live site, all primary trial and signup CTAs ("Sign Up Now", "Start 14-day Free trial") redirect to `https://blastlearning.in/math-genius-maker/#Startyourtrial`.

2. **Existing Registration Backend**:
   - Section `#Startyourtrial` on the live site embeds an external iframe to **Edmission CRM**:
     ```html
     <iframe src="https://form.edmissioncrm.com/form-preview/30951a2b-e0cd-42ff-a85b-b0baec35eacc" ...></iframe>
     ```
   - Lead submission, validation, OTP verification, and database storage are handled entirely off-site by Edmission CRM servers.

3. **Approved Campaign Requirement**:
   - The client has approved the **Personalized AI Tutor** campaign landing page (`index.html`), which features a high-converting **on-page 3-step registration form** (`#blast-trial-form`).
   - The form must remain embedded on the page (no redirect to `/trial/`, no separate `trial.html`).
   - The form must connect cleanly to the existing lead capture ecosystem without faking success or bypassing security.

4. **Payment Security Mandate**:
   - The original Antigravity exploration in `index.html` contained dummy fields for card number, expiry, CVV, and a simulated Razorpay popup.
   - In accordance with **PCI DSS Level 1** compliance and **RBI e-Mandate Regulations**, collecting or processing raw payment card details through custom HTML or JavaScript is **strictly prohibited**.
   - All simulated raw credit card fields have been removed from the embeddable package. Production checkout must utilize Razorpay Standard Hosted Checkout or post-trial payment links.

---

## 2. Live Website Registration Form Audit

Inspection of the rendered DOM within the live Edmission CRM form revealed the following fields, validation patterns, and data points:

| Live Field | Element Type | Required | Purpose & Handling |
| :--- | :--- | :---: | :--- |
| `parent_name` | Text input | Yes | Parent/guardian full name |
| `phone` | Tel input + "Send OTP" | Yes | 10-digit Indian mobile number with SMS OTP verification |
| `email` | Email input | Yes | Primary email for credentials and weekly reports |
| `student_name` | Text input | Yes | Student's name for LMS onboarding |
| `grade` | Dropdown | Yes | Student's school class (Grades 5 to 12) |
| `school_board` | Radio / Dropdown | Yes | Curriculum board (CBSE, ICSE, State Board) |
| `country` / `state` / `city` | Dropdown / Text | Yes | Geographic location for localized curriculum mapping |
| `math_challenge` | Dropdown / Text | Optional | Specific subject hurdle or academic friction |
| `tuition_status` | Radio | Optional | Whether student currently attends offline/online tuition |
| `terms_consent` | Checkbox | Yes | Legal consent for WhatsApp messaging & terms of service |

---

## 3. Landing-Page Form Field Alignment

The approved on-page form in `landing-page-elementor.html` (`#blast-trial-form`) maps directly to the CRM data model while delivering a frictionless, 3-step progressive onboarding UX:

```
[ Step 1: About Your Child ]
  ├── input-student-name      → student_name (e.g. "Ananya")
  ├── select-student-class    → student_class ("5" through "12")
  ├── board-selector (pills)  → board ("CBSE", "ICSE", "State board")
  ├── input-school            → school (optional, e.g. "DPS Bangalore East")
  └── select-where-to-start   → subject_start ("All subjects", "Math", "Science", etc.)

[ Step 2: The Goal ]
  ├── select-current-grade    → current_grade ("Below 60%", "60-75%", "75-85%", "85-95%")
  ├── select-target-grade     → target_grade ("85-90%", "90-95%", "95%+", "Top 10")
  └── input-biggest-hurdle    → biggest_hurdle ("Forgets formulas, test anxiety, etc.")

[ Step 3: Parent Details & Plan Confirmation ]
  ├── input-parent-name       → parent_name ("Rahul Sharma")
  ├── input-parent-phone      → parent_phone (10 digits with automatic formatting)
  ├── input-parent-email      → parent_email ("rahul@example.com")
  └── input-billing-plan      → billing_plan ("all_access_1699", hidden token)
```

---

## 4. Backend Submission Architecture & Implementation

To bridge the on-page Custom HTML form with the WordPress and CRM backend, we provide two supported, production-ready integration methods:

### Method A: WordPress Custom REST API Endpoint (Recommended)

This approach creates a secure, native REST endpoint in WordPress (`/wp-json/blast/v1/trial-signup`) that accepts the form payload, sanitizes the data, sends instant email notifications to the Blast Learning admissions team, and forwards the lead to Edmission CRM via webhook.

#### 1. Server-Side PHP Handler (`functions.php` or `mu-plugins/blast-lead-capture.php`):
```php
<?php
/**
 * Blast Learning: Campaign Registration REST Endpoint
 * Mounts endpoint at /wp-json/blast/v1/trial-signup
 */

add_action('rest_api_init', function () {
    register_rest_route('blast/v1', '/trial-signup', array(
        'methods'             => 'POST',
        'callback'            => 'blast_handle_trial_signup',
        'permission_callback' => '__return_true', // Public lead capture
    ));
});

function blast_handle_trial_signup(WP_REST_Request $request) {
    $params = $request->get_json_params();

    // 1. Sanitize Incoming Data
    $student_name   = sanitize_text_field($params['student_name'] ?? '');
    $student_class  = sanitize_text_field($params['student_class'] ?? '');
    $board          = sanitize_text_field($params['board'] ?? 'CBSE');
    $school         = sanitize_text_field($params['school'] ?? '');
    $subject_start  = sanitize_text_field($params['subject_start'] ?? 'All subjects');
    $current_grade  = sanitize_text_field($params['current_grade'] ?? '');
    $target_grade   = sanitize_text_field($params['target_grade'] ?? '');
    $biggest_hurdle = sanitize_text_field($params['biggest_hurdle'] ?? '');
    $parent_name    = sanitize_text_field($params['parent_name'] ?? '');
    $parent_phone   = preg_replace('/\D/', '', $params['parent_phone'] ?? '');
    $parent_email   = sanitize_email($params['parent_email'] ?? '');
    $billing_plan   = sanitize_text_field($params['billing_plan'] ?? 'all_access_1699');
    $source_url     = esc_url_raw($params['source_url'] ?? '');

    // 2. Server-Side Validation
    if (empty($student_name) || empty($student_class) || empty($parent_name) || 
        strlen($parent_phone) !== 10 || !is_email($parent_email)) {
        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'Missing or invalid required fields.'
        ), 400);
    }

    // 3. Dispatch to Edmission CRM / Webhook Endpoint
    // Replace with actual Edmission CRM lead intake webhook URL
    $crm_webhook_url = defined('BLAST_CRM_WEBHOOK_URL') ? BLAST_CRM_WEBHOOK_URL : '';
    if (!empty($crm_webhook_url)) {
        wp_remote_post($crm_webhook_url, array(
            'headers'     => array('Content-Type' => 'application/json'),
            'body'        => wp_json_encode($params),
            'timeout'     => 10,
            'blocking'    => false, // Non-blocking asynchronous dispatch
        ));
    }

    // 4. Send Internal Email Notification to Admissions
    $to      = get_option('admin_email');
    $subject = "New 7-Day Trial Lead: {$student_name} (Class {$student_class} {$board})";
    $body    = "A new trial registration was submitted on the Personalized AI Tutor page:\n\n" .
               "Student: {$student_name}\n" .
               "Class: Class {$student_class} ({$board})\n" .
               "School: " . ($school ?: 'Not provided') . "\n" .
               "Current Grade: {$current_grade} -> Target: {$target_grade}\n" .
               "Starting Subject: {$subject_start}\n" .
               "Biggest Hurdle: {$biggest_hurdle}\n\n" .
               "Parent: {$parent_name}\n" .
               "WhatsApp Phone: +91 {$parent_phone}\n" .
               "Email: {$parent_email}\n" .
               "Plan: {$billing_plan} (₹1,699/mo after 7-day trial)\n" .
               "Source: {$source_url}\n";

    wp_mail($to, $subject, $body);

    // 5. Return Clean Success Response
    return new WP_REST_Response(array(
        'success'      => true,
        'message'      => '7-Day Free Trial activated successfully.',
        'student_name' => $student_name,
        'parent_phone' => $parent_phone,
    ), 200);
}
```

#### 2. Client-Side JavaScript Configuration:
The JavaScript included in `landing-page-elementor.html` is already wired to communicate with this endpoint by default:
```javascript
const endpoint = (window.BLAST_SETTINGS && window.BLAST_SETTINGS.endpoint) 
  ? window.BLAST_SETTINGS.endpoint 
  : '/wp-json/blast/v1/trial-signup';
```

---

### Method B: Direct Webhook Integration (Zapier / Make / CRM Webhook)

If the developer prefers not to edit PHP files on the server:
1. Create an incoming webhook in **Zapier**, **Make.com**, or **Edmission CRM**.
2. Pass the webhook URL to the page via a tiny inline snippet above the widget:
   ```html
   <script>
     window.BLAST_SETTINGS = {
       endpoint: 'https://hooks.zapier.com/hooks/catch/xxxxxx/yyyyyy/'
     };
   </script>
   ```
3. The on-page form will immediately `POST` JSON data directly to the webhook, which routes the lead into Edmission CRM, sends WhatsApp onboarding messages, and alerts the sales team.

---

## 5. Payment Flow & Security Compliance Audit

### Why Simulated Card Inputs Were Strictly Removed
In the initial prototype code, fields for card numbers, expiry dates, and CVVs were rendered in standard `<input>` elements. We eliminated this design for several critical reasons:

1. **PCI DSS Compliance**: Handling unencrypted card numbers on a web server or through custom client scripts violates Payment Card Industry Data Security Standards. It exposes the domain to massive liability, chargeback penalties, and merchant account revocation.
2. **RBI Mandates (India)**: In India, card transactions require **Two-Factor Authentication (AFA/OTP)** and cannot be processed via simple form POSTs. Furthermore, recurring subscription charges require explicit e-Mandate registration through certified banks or Reserve Bank of India tokenization engines.
3. **Conversion Friction**: Demanding credit card numbers upfront on a 7-day free trial drastically depresses conversion rates in the Indian market, where UPI and debit cards predominate.

### Recommended Production Payment Options

#### Option 1: Frictionless 7-Day Free Trial (Recommended)
- **Day 0 (Registration)**: Collect student and parent details. Grant immediate trial access for 7 days with ₹0 charged today.
- **Day 5 (Automated Nudge)**: Send WhatsApp notification highlighting calibration metrics and study progress.
- **Day 7 (Payment Link)**: Deliver a secure Razorpay Payment Link for ₹1,699/month via WhatsApp & Email, supporting UPI (Google Pay, PhonePe, Paytm), Net Banking, and Debit/Credit Cards.

#### Option 2: Razorpay Hosted Checkout with ₹0 Card Auth
If card pre-authorization is required before granting trial access:
1. Dynamically load the official Razorpay script:
   ```html
   <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
   ```
2. The server-side API creates a Razorpay Subscription (`sub_xxxxxx`) with an initial `auth_amount` of ₹5 (refunded immediately) and a recurring billing cycle starting on Day 8.
3. Razorpay's PCI-compliant modal opens securely, collects card / UPI mandate details, performs bank 3D-Secure OTP verification, and returns `razorpay_payment_id` and `razorpay_signature` to the callback handler.
4. **Zero card details ever touch the Blast Learning website.**

---

## 6. Unresolved Backend Dependencies & Developer Action Items

Before launching the campaign, the WordPress development team must address the following technical prerequisites:

| Item | Dependency | Status | Action Required |
| :---: | :--- | :---: | :--- |
| **1** | **REST API Route or Webhook** | Pending | Add the provided PHP snippet to `functions.php` or configure a webhook URL in `window.BLAST_SETTINGS.endpoint`. |
| **2** | **Edmission CRM Ingestion** | Pending | Confirm the incoming endpoint or email ingestion address used by Edmission CRM for lead assignment. |
| **3** | **Admissions Email Notification** | Ready | Verify that `admin_email` in WordPress is receiving system emails (or configure WP Mail SMTP if using external email service). |
| **4** | **Payment Gateway Integration** | Planned | If upfront e-Mandate authorization is required, generate Razorpay API credentials in the Razorpay Dashboard. |

> [!IMPORTANT]
> The landing page code in `landing-page-elementor.html` will NOT simulate fake payment success. If submitted before the backend endpoint is mounted, it displays a polite error message prompting the user to contact the team at `info@blastlearning.in` or `+91 87926 97655`.
