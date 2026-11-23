# Blast Learning — Personalized AI Tutor Backend Integration Report

This document details the backend architectural audit of the live Blast Learning website (`https://blastlearning.in/`), verifies existing signup destinations, evaluates endpoint availability, documents payment security requirements, and outlines the exact production integration steps for `#blast-trial-form`.

---

## 1. Verified Live Site Backend Architecture

### 1.1. Live Site Lead Intake & Registration Audit
1. **Live Signup Destination**:
   - All primary trial/signup CTAs on `https://blastlearning.in/` redirect users to:
     `https://blastlearning.in/math-genius-maker/#Startyourtrial`
2. **Edmission CRM Integration**:
   - Section `#Startyourtrial` on the live site embeds an external single-page app via an iframe:
     `https://form.edmissioncrm.com/form-preview/30951a2b-e0cd-42ff-a85b-b0baec35eacc`
   - Data collection, mobile phone OTP verification ("Send OTP"), student grade selection, and CRM lead storage are processed within this sandboxed Amazon S3/CloudFront application.
3. **WordPress Plugins Inspection**:
   - The WordPress instance runs **Hello Elementor** with **Elementor Pro**.
   - **No native WordPress form plugin** (Contact Form 7, WPForms, Gravity Forms, Fluent Forms) is active.

### 1.2. REST Endpoint Verification (`/wp-json/blast/v1/trial-signup`)
- **Direct Probe Result**:
  An HTTP request to `https://blastlearning.in/wp-json/blast/v1/trial-signup` returns:
  `HTTP 404 Not Found (rest_no_route)`
- **Conclusion**:
  The custom REST API route proposed in earlier migration concepts has **not been deployed** to the live WordPress server.
- **Form Safety Behavior**:
  In accordance with project guidelines:
  - The client-side JavaScript does **NOT fake a successful submission** or simulate fake Razorpay modals.
  - If submitted while the server endpoint returns 404 or connection fails, `#blast-trial-form` re-enables the submit button, displays a clear, helpful notice, and provides a direct fallback link to the verified admissions destination (`https://blastlearning.in/math-genius-maker/#Startyourtrial`).

---

## 2. On-Page Form Implementation (`#blast-trial-form`)

The approved on-page form remains embedded on the single landing page and captures the complete data payload:

```json
{
  "campaign": "personalized-ai-tutor",
  "student_name": "Ananya",
  "student_class": "9",
  "board": "CBSE",
  "school": "DPS Bangalore East",
  "subject_start": "All subjects",
  "current_grade": "75-85%",
  "target_grade": "90-95%",
  "biggest_hurdle": "Forgets formulas, math anxiety",
  "parent_name": "Rahul Sharma",
  "parent_phone": "9876543210",
  "parent_email": "rahul@example.com",
  "billing_plan": "all_access_1699",
  "source_url": "https://blastlearning.in/courses/personalized-ai-tutor/",
  "submitted_at": "2026-11-23T07:35:00.000Z"
}
```

### Form Features:
- **Zero Raw Card Fields**: Raw card numbers, expiry dates, and CVVs were strictly eliminated.
- **Input Masking & Phone Validation**: Indian mobile numbers are validated (`/^[6-9]\d{9}$/`) with auto-formatted spacing.
- **Duplicate Click Lock**: Submit button is disabled with an animated spinner during network requests to prevent duplicate submissions.
- **Dynamic Configuration**: Can be routed to any webhook or REST URL via `window.BLAST_SETTINGS.endpoint`.

---

## 3. Server-Side Activation Snippet (Required to Complete Backend Integration)

To make `/wp-json/blast/v1/trial-signup` live, the WordPress developer should add this snippet to `functions.php` or a dedicated mu-plugin:

```php
<?php
/**
 * Blast Learning: Campaign Registration REST Endpoint
 * Location: wp-content/mu-plugins/blast-lead-capture.php
 */

add_action('rest_api_init', function () {
    register_rest_route('blast/v1', '/trial-signup', array(
        'methods'             => 'POST',
        'callback'            => 'blast_handle_trial_signup',
        'permission_callback' => '__return_true', // Public lead intake
    ));
});

function blast_handle_trial_signup(WP_REST_Request $request) {
    $params = $request->get_json_params();

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

    // Server-Side Validation
    if (empty($student_name) || empty($student_class) || empty($parent_name) || 
        strlen($parent_phone) !== 10 || !is_email($parent_email)) {
        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'Missing or invalid required fields.'
        ), 400);
    }

    // Forward to CRM Webhook if configured
    $crm_webhook = defined('BLAST_CRM_WEBHOOK_URL') ? BLAST_CRM_WEBHOOK_URL : '';
    if (!empty($crm_webhook)) {
        wp_remote_post($crm_webhook, array(
            'headers'  => array('Content-Type' => 'application/json'),
            'body'     => wp_json_encode($params),
            'timeout'  => 8,
            'blocking' => false,
        ));
    }

    // Email notification to admissions team
    $to      = get_option('admin_email');
    $subject = "New Trial Lead: {$student_name} (Class {$student_class} {$board})";
    $message = "Student: {$student_name}\nClass: {$student_class} ({$board})\nSchool: {$school}\nGoal: {$current_grade} -> {$target_grade}\nParent: {$parent_name}\nPhone: +91 {$parent_phone}\nEmail: {$parent_email}\nPlan: {$billing_plan}";
    wp_mail($to, $subject, $message);

    return new WP_REST_Response(array(
        'success'      => true,
        'message'      => '7-Day Free Trial activated successfully.',
        'student_name' => $student_name,
        'parent_phone' => $parent_phone,
    ), 200);
}
```

---

## 4. Payment Security & Compliance Audit

### Strict Prohibition on Custom Card Collection:
- **PCI DSS Level 1**: Storing, processing, or transmitting raw PAN (Primary Account Number), CVV, or card expiry dates on a web server or custom client form requires Level 1 PCI certification and annual third-party audits.
- **RBI Regulations**: In India, recurring e-mandates require **AFA (Additional Factor Authentication)** through bank-integrated tokenization engines. Custom forms cannot execute compliant card mandates.

### Approved Production Payment Flow:
1. **Frictionless Trial (Recommended)**: Lead submits registration &rarr; immediate 7-day trial granted with ₹0 charged &rarr; automated WhatsApp message sent with calibration login credentials &rarr; on Day 6/7, parent receives an authenticated **Razorpay Payment Link** for ₹1,699/month.
2. **Hosted Checkout Pre-Auth (Optional)**: If card authorization is required on Day 0, the server initializes a Razorpay Subscription (`sub_xxxxxx`) and launches the official Razorpay hosted checkout (`https://checkout.razorpay.com/v1/checkout.js`).

---

## 5. Outstanding Dependencies & Action Items

| Item | Technical Dependency | Current Status | Action Required |
| :---: | :--- | :---: | :--- |
| **1** | WordPress REST Endpoint | **404 Not Found** | Deploy PHP route snippet to WordPress `functions.php` or mu-plugin. |
| **2** | Edmission CRM Webhook | **Pending Key** | Provide CRM incoming webhook URL to bridge trial submissions. |
| **3** | Admissions Notification Email | **Ready** | Verify WordPress SMTP is active to deliver lead alerts to staff. |
| **4** | Razorpay Live Credentials | **Pending** | Required only if implementing upfront card pre-authorization. |
