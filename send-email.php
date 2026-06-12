<?php
/**
 * Schröder's Joinery - Contact Form Email Handler
 * Processes the contact form submission, validates and sanitizes input, and sends email to Brandon.
 */

// Set response headers to JSON
header('Content-Type: application/json; charset=utf-8');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

// Recipient email address
$recipient = 'brandon@schrodersjoinery.co.za';

// Extract and sanitize input fields
$fullName = isset($_POST['fullName']) ? strip_tags(trim($_POST['fullName'])) : '';
$companyName = isset($_POST['companyName']) ? strip_tags(trim($_POST['companyName'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$phone = isset($_POST['phone']) ? strip_tags(trim($_POST['phone'])) : '';
$serviceInterested = isset($_POST['serviceInterested']) ? strip_tags(trim($_POST['serviceInterested'])) : '';
$subject = isset($_POST['subject']) ? strip_tags(trim($_POST['subject'])) : '';
$message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message']), ENT_QUOTES, 'UTF-8') : '';

// Validation checks
if (empty($fullName)) {
    echo json_encode(['success' => false, 'error' => 'Full Name is required.']);
    exit;
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'A valid email address is required.']);
    exit;
}

if (empty($serviceInterested)) {
    echo json_encode(['success' => false, 'error' => 'Please select a service area.']);
    exit;
}

if (empty($subject)) {
    echo json_encode(['success' => false, 'error' => 'Subject is required.']);
    exit;
}

if (empty($message)) {
    echo json_encode(['success' => false, 'error' => 'Message details are required.']);
    exit;
}

// Map service keys to readable names
$servicesMap = [
    'kitchens'   => 'Bespoke Kitchens',
    'cabinetry'  => 'Custom Cabinetry & Wardrobes',
    'furniture'  => 'Bespoke Furniture',
    'bathrooms'  => 'Luxury Bathrooms',
    'interiors'  => 'Full Interior Joinery',
    'offices'    => 'Executive Offices & Fitouts',
    'other'      => 'Other Joinery Request'
];
$readableService = isset($servicesMap[$serviceInterested]) ? $servicesMap[$serviceInterested] : $serviceInterested;

// Format the email subject line
$emailSubject = "Website Inquiry: " . $subject;

// Prevent header injection by removing newlines from user names & emails
$cleanFullName = str_replace(array("\r", "\n"), '', $fullName);
$cleanEmail = str_replace(array("\r", "\n"), '', $email);

// Compose the HTML email body
$emailContent = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333333; }
        .container { max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 5px; overflow: hidden; }
        .header { background-color: #060d28; color: #ffffff; padding: 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 20px; font-weight: normal; color: #D4AF37; }
        .content { padding: 25px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555555; font-size: 13px; text-transform: uppercase; margin-bottom: 2px; }
        .value { font-size: 15px; background-color: #f9f9f9; padding: 10px; border-radius: 3px; border-left: 3px solid #D4AF37; }
        .message-box { font-size: 15px; background-color: #f9f9f9; padding: 15px; border-radius: 3px; white-space: pre-wrap; border: 1px solid #e0e0e0; }
        .footer { background-color: #f5f5f5; color: #777777; text-align: center; padding: 15px; font-size: 11px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>New Website Inquiry</h1>
            <p style='margin: 5px 0 0 0; font-size: 12px; color: rgba(255,255,255,0.7);'>Schröder's Joinery</p>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>From</div>
                <div class='value'>$cleanFullName</div>
            </div>";

if (!empty($companyName)) {
    $emailContent .= "
            <div class='field'>
                <div class='label'>Company</div>
                <div class='value'>$companyName</div>
            </div>";
}

$emailContent .= "
            <div class='field'>
                <div class='label'>Email Address</div>
                <div class='value'><a href='mailto:$cleanEmail'>$cleanEmail</a></div>
            </div>";

if (!empty($phone)) {
    $emailContent .= "
            <div class='field'>
                <div class='label'>Phone Number</div>
                <div class='value'><a href='tel:$phone'>$phone</a></div>
            </div>";
}

$emailContent .= "
            <div class='field'>
                <div class='label'>Service Interested In</div>
                <div class='value'>$readableService</div>
            </div>
            <div class='field'>
                <div class='label'>Subject</div>
                <div class='value'>$subject</div>
            </div>
            <div class='field'>
                <div class='label'>Project Details</div>
                <div class='message-box'>" . nl2br($message) . "</div>
            </div>
        </div>
        <div class='footer'>
            This inquiry was sent directly from the contact form on schrodersjoinery.co.za.
        </div>
    </div>
</body>
</html>
";

// Set mail headers
// IMPORTANT: The "From" header MUST be a local domain email account (e.g. no-reply@schrodersjoinery.co.za)
// so that the server's SPF/DKIM validation succeeds. Submitter's email goes into "Reply-To".
$headers = array(
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: Schröder\'s Joinery Website <no-reply@schrodersjoinery.co.za>',
    'Reply-To: ' . $cleanFullName . ' <' . $cleanEmail . '>',
    'X-Mailer: PHP/' . phpversion()
);
$headersString = implode("\r\n", $headers);

// Attempt to send email
if (mail($recipient, $emailSubject, $emailContent, $headersString)) {
    echo json_encode(['success' => true]);
} else {
    // If sending fails, return error response
    echo json_encode(['success' => false, 'error' => 'Unable to send email. Please check server mail configuration.']);
}
