<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../../config/config.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
session_destroy();

echo json_encode(['sucesso' => true]);
