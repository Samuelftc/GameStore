<?php 

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

define('ROOT_PATH', dirname(__DIR__));

define('INCLUDES_PATH', ROOT_PATH . '/includes');
define('PUBLIC_PATH', ROOT_PATH . '/public');

define('BASE_URL', 'http://localhost/GameStore');


// Assets
define('ASSETS_URL', BASE_URL . '/assets');
define('CSS_URL', ASSETS_URL . '/css');
define('IMAGES_URL', ASSETS_URL . '/images');
define('JS_URL', ASSETS_URL . '/js');

// BACKEND - URL
define('API_URL', BASE_URL . '/API');
define('MODEL_URL', BASE_URL . '/models');

// BACKEND — caminhos de arquivo para require_once
define('MODEL_PATH', ROOT_PATH . '/models');

?>