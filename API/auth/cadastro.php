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

$nome = trim($_POST['nome'] ?? '');
$email = trim($_POST['email'] ?? '');
$senha = trim($_POST['senha'] ?? '');
$confirmarSenha = trim($_POST['confirmarSenha'] ?? '');
$termos = trim($_POST['termos'] ?? '');

if (empty($nome) || empty($email) || empty($senha)) {
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

if ($senha !== $confirmarSenha) {
    http_response_code(400);

    echo json_encode([
        'sucesso' => false,
        'mensagem' => "As senhas não coincidem!"
    ]);
    exit;
}

$regex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/';

if (!preg_match($regex, $senha)) {
    http_response_code(400);

    echo json_encode([
        'sucesso' => false,
        'mensagem' => "A senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial."
    ]);
    exit;
}

$emailExiste = $usuarioModel->emailExiste($email);

if ($emailExiste) {
    http_response_code(409);

    echo json_encode([
        'sucesso' => false,
        'mensagem' => "O e-mail informado já está em uso!"
    ]);
    exit;
}

if ($termos !== 'on') {
    http_response_code(400);

    echo json_encode([
        'sucesso' => false,
        'mensagem' => "Você deve concordar com os termos de uso!"
    ]);
    exit;
}

$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

try {
    $usuarioId = $usuarioModel->cadastrarUsuario([
        'nome' => $nome,
        'email' => $email,
        'senha' => $senhaHash
    ]);

    echo json_encode([
        'sucesso' => true,
        'mensagem' => "Cadastro realizado com sucesso!"
    ]);
    exit;
} catch (Exception $e) {
    http_response_code(500);

    echo json_encode([
        'sucesso' => false,
        'mensagem' => "Ocorreu um erro ao cadastrar. Por favor, tente novamente."
    ]);
    exit;
}