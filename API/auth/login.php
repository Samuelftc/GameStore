<?php

header("Content-Type: application/json");

require_once __DIR__ . '/../config/config.php';
require_once MODEL_URL . '/usuarioModel.php';

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
}

try {
    $usuario = $usuarioModel->buscarPorEmail($email);

    $hash1 = md5($senha . "20sdabjkasdbaksdhajs6" . $email . "fbasl1524125462");

    if (!$usuario || !password_verify($hash1, $usuario['senha'])) {
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

if ($usuario['ativo'] == 0) {
    http_response_code(403);

    echo json_encode([
        'sucesso' => false,
        'mensagem' => "Conta inativa. Entre em contato com o suporte."
    ]);
    exit;
}

session_start();
session_regenerate_id(true);

$_SESSION['usuario'] = [
    'id' => $usuario['id'],
    'nome' => $usuario['nome'],
    'email' => $usuario['email']
];

echo json_encode([
    'sucesso' => true,
    'mensagem' => "Login realizado!",
    'usuario' => [
        'id' => $usuario['id'],
        'nome' => $usuario['nome'],
        'email' => $usuario['email']
    ]
]);