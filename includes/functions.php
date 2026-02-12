<?php
// Fonctions utilitaires pour le portfolio

// Connexion à la base de données
function getDBConnection() {
    try {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );
        return $pdo;
    } catch (PDOException $e) {
        if (DEBUG_MODE) {
            die("Erreur de connexion à la base de données: " . $e->getMessage());
        } else {
            die("Une erreur technique est survenue. Veuillez réessayer plus tard.");
        }
    }
}

// Récupérer tous les projets
function getProjects() {
    global $projects_data;
    
    // En attendant la mise en place de la BDD, on retourne les données de config
    return $projects_data;
    
    /*
    try {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("SELECT * FROM projects ORDER BY featured DESC, created_at DESC");
        $stmt->execute();
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        if (DEBUG_MODE) {
            error_log("Erreur lors de la récupération des projets: " . $e->getMessage());
        }
        return [];
    }
    */
}

// Récupérer un projet spécifique
function getProject($id) {
    global $projects_data;
    
    foreach ($projects_data as $project) {
        if ($project['id'] == $id) {
            return $project;
        }
    }
    return null;
    
    /*
    try {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("SELECT * FROM projects WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    } catch (PDOException $e) {
        if (DEBUG_MODE) {
            error_log("Erreur lors de la récupération du projet: " . $e->getMessage());
        }
        return null;
    }
    */
}

// Récupérer toutes les compétences
function getSkills() {
    global $skills_data;
    return $skills_data;
    
    /*
    try {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("SELECT * FROM skills ORDER BY category, name");
        $stmt->execute();
        $skills = $stmt->fetchAll();
        
        // Grouper par catégorie
        $groupedSkills = [];
        foreach ($skills as $skill) {
            $groupedSkills[$skill['category']][] = $skill;
        }
        
        return $groupedSkills;
    } catch (PDOException $e) {
        if (DEBUG_MODE) {
            error_log("Erreur lors de la récupération des compétences: " . $e->getMessage());
        }
        return [];
    }
    */
}

// Récupérer les expériences
function getExperiences() {
    global $experiences_data;
    return $experiences_data;
    
    /*
    try {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("SELECT * FROM experiences ORDER BY start_date DESC");
        $stmt->execute();
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        if (DEBUG_MODE) {
            error_log("Erreur lors de la récupération des expériences: " . $e->getMessage());
        }
        return [];
    }
    */
}

// Fonctions de validation
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function validateString($string, $minLength = 1, $maxLength = 255) {
    $length = strlen(trim($string));
    return $length >= $minLength && $length <= $maxLength;
}

function sanitizeString($string) {
    return htmlspecialchars(trim($string), ENT_QUOTES, 'UTF-8');
}

// Fonctions de sécurité
function generateCSRFToken() {
    if (!isset($_SESSION['csrf_token']) || !isset($_SESSION['csrf_token_time'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        $_SESSION['csrf_token_time'] = time();
    }
    return $_SESSION['csrf_token'];
}

function validateCSRFToken($token) {
    if (!isset($_SESSION['csrf_token']) || !isset($_SESSION['csrf_token_time'])) {
        return false;
    }
    
    if ($token !== $_SESSION['csrf_token']) {
        return false;
    }
    
    // Vérifier que le token n'est pas trop vieux (1 heure)
    if (time() - $_SESSION['csrf_token_time'] > 3600) {
        unset($_SESSION['csrf_token']);
        unset($_SESSION['csrf_token_time']);
        return false;
    }
    
    return true;
}

// Fonctions de gestion des fichiers
function uploadFile($file, $targetDir, $allowedTypes = ['jpg', 'jpeg', 'png', 'gif']) {
    global $security_config;
    
    if (!isset($file['tmp_name']) || !is_uploaded_file($file['tmp_name'])) {
        return ['success' => false, 'message' => 'Aucun fichier valide.'];
    }
    
    // Vérifier la taille du fichier
    if ($file['size'] > $security_config['max_upload_size']) {
        return ['success' => false, 'message' => 'Le fichier est trop volumineux.'];
    }
    
    // Vérifier le type de fichier
    $fileInfo = pathinfo($file['name']);
    $extension = strtolower($fileInfo['extension']);
    
    if (!in_array($extension, $allowedTypes)) {
        return ['success' => false, 'message' => 'Type de fichier non autorisé.'];
    }
    
    // Créer le répertoire s'il n'existe pas
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    }
    
    // Générer un nom de fichier unique
    $fileName = uniqid() . '.' . $extension;
    $targetPath = $targetDir . '/' . $fileName;
    
    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        return ['success' => true, 'filename' => $fileName, 'path' => $targetPath];
    } else {
        return ['success' => false, 'message' => 'Erreur lors du téléchargement du fichier.'];
    }
}

// Fonctions d'envoi d'email
function sendEmail($to, $subject, $message, $from = null) {
    global $email_config;
    
    $headers = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=UTF-8';
    
    if ($from) {
        $headers[] = 'From: ' . $from;
    } else {
        $headers[] = 'From: ' . $email_config['from_name'] . ' <' . $email_config['from_email'] . '>';
    }
    
    $subject = $email_config['subject_prefix'] . $subject;
    
    return mail($to, $subject, $message, implode("\r\n", $headers));
}

// Fonctions de formatage
function formatDate($date, $format = 'd/m/Y') {
    return date($format, strtotime($date));
}

function truncateText($text, $length = 150, $suffix = '...') {
    if (strlen($text) <= $length) {
        return $text;
    }
    return substr($text, 0, $length) . $suffix;
}

// Fonctions de pagination
function paginate($items, $page = 1, $itemsPerPage = 6) {
    $totalItems = count($items);
    $totalPages = ceil($totalItems / $itemsPerPage);
    $offset = ($page - 1) * $itemsPerPage;
    
    return [
        'items' => array_slice($items, $offset, $itemsPerPage),
        'current_page' => $page,
        'total_pages' => $totalPages,
        'total_items' => $totalItems,
        'has_previous' => $page > 1,
        'has_next' => $page < $totalPages
    ];
}

// Fonctions de logging
function logError($message, $context = []) {
    $logMessage = date('Y-m-d H:i:s') . ' - ' . $message;
    if (!empty($context)) {
        $logMessage .= ' - Context: ' . json_encode($context);
    }
    $logMessage .= PHP_EOL;
    
    error_log($logMessage, 3, ERROR_LOG);
}

// Fonctions de redirection
function redirect($url, $statusCode = 302) {
    header('Location: ' . $url, true, $statusCode);
    exit();
}

// Fonctions de session
function flashMessage($type, $message) {
    $_SESSION['flash'][$type] = $message;
}

function getFlashMessages() {
    $messages = $_SESSION['flash'] ?? [];
    unset($_SESSION['flash']);
    return $messages;
}

// Fonctions de cache simple
function cacheGet($key) {
    $cacheFile = 'cache/' . md5($key) . '.cache';
    if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < 3600) {
        return unserialize(file_get_contents($cacheFile));
    }
    return null;
}

function cacheSet($key, $data) {
    $cacheFile = 'cache/' . md5($key) . '.cache';
    if (!is_dir('cache')) {
        mkdir('cache', 0755, true);
    }
    file_put_contents($cacheFile, serialize($data));
}
?>
