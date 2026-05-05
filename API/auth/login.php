<?php

header("Content-Type: application/json");

require_once __DIR__ . '/../../config/config.php';
require_once MODEL_PATH . '/usuarioModel.php';

$usuarioModel = new UsuarioModel();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);

    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Método não permitido'
    ]);
    exit;
}

$email = trim($_POST['email'] ?? '');
$senha = trim($_POST['senha'] ?? '');

if (empty($email) || empty($senha)) {
    http_response_code(400);

    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Por favor, preencha todos os campos!'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);

    echo json_encode([
        'sucesso' => false,
        'mensagem' => "Por favor, insira um e-mail válido!"
    ]);
    exit;
}

try {
    $usuario = $usuarioModel->buscarPorEmail($email);

    if (!$usuario || !password_verify($senha, $usuario['senha'])) {
        http_response_code(401);

        echo json_encode([
            'sucesso' => false,
            'mensagem' => "Credenciais inválidas!"
        ]);
        exit;
    }
} catch (PDOException $e) {
    http_response_code(500);

    echo json_encode([
        'sucesso' => false,
        'mensagem' => "Erro no banco de dados."
    ]);
    exit;
}

if ($usuario['status'] == 0) {
    http_response_code(403);

    echo json_encode([
        'sucesso' => false,
        'mensagem' => "Conta inativa. Entre em contato com o suporte."
    ]);
    exit;
}

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
session_regenerate_id(true);

$_SESSION['usuario'] = [
    'id' => $usuario['id'],
    'nome' => $usuario['nome'],
    'email' => $usuario['email'],
    'criado_em' => date('d/m/Y', strtotime($usuario['criado_em']))
];

echo json_encode([
    'sucesso' => true,
    'mensagem' => "Login realizado!",
    'usuario' => [
        'id' => $usuario['id'],
        'nome' => $usuario['nome'],
        'email' => $usuario['email'],
        'criado_em' => date('d/m/Y', strtotime($usuario['criado_em']))
    ]
]);
exit;