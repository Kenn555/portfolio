<?php
require_once '../config/config.php';
require_once 'functions.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
    exit;
}

if (!validateCSRFToken($_POST['csrf_token'] ?? '')) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Erreur de sécurité.']);
    exit;
}

$name = sanitizeString($_POST['name'] ?? '');
$email = sanitizeString($_POST['email'] ?? '');
$subject = sanitizeString($_POST['subject'] ?? '');
$message = sanitizeString($_POST['message'] ?? '');

$errors = [];

if (!validateString($name, 2, 100)) {
    $errors['name'] = 'Nom invalide';
}

if (!validateEmail($email)) {
    $errors['email'] = 'Email invalide';
}

if (!validateString($subject, 3, 150)) {
    $errors['subject'] = 'Sujet invalide';
}

if (!validateString($message, 10, 2000)) {
    $errors['message'] = 'Message invalide (10-2000 caractères)';
}

if (!empty($errors)) {
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

$emailSubject = "Nouveau message de contact: " . $subject;
$emailBody = "
<html>
<body>
    <h2>Nouveau message de contact</h2>
    <p><strong>Nom:</strong> {$name}</p>
    <p><strong>Email:</strong> {$email}</p>
    <p><strong>Sujet:</strong> {$subject}</p>
    <hr>
    <p><strong>Message:</strong></p>
    <p>" . nl2br($message) . "</p>
    <hr>
    <p><small>Envoyé le: " . date('d/m/Y H:i:s') . "</small></p>
</body>
</html>";

if (sendEmail($email_config['to_email'], $emailSubject, $emailBody)) {
    echo json_encode(['success' => true, 'message' => $messages['contact_success']]);
} else {
    echo json_encode(['success' => false, 'message' => $messages['contact_error']]);
}
?>
