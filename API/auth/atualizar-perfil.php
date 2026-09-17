<?php

header('Content-Type: application/json');
session_start();

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../models/usuarioModel.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Método não permitido']);
    exit;
}

if (!isset($_SESSION['usuario'])) {
    http_response_code(401);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Não autorizado']);
    exit;
}

$usuarioId = $_SESSION['usuario']['id'];
$nome = trim($_POST['nome'] ?? '');
$email = trim($_POST['email'] ?? '');

// Validações
if (empty($nome) || empty($email)) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Nome e email são obrigatórios']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Email inválido']);
    exit;
}

if (strlen($nome) < 3) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Nome deve ter no mínimo 3 caracteres']);
    exit;
}

$model = new UsuarioModel();

// Verifica se o email já existe (e não é do próprio usuário)
$usuarioExistente = $model->buscarPorEmail($email);
if ($usuarioExistente && $usuarioExistente['id'] != $usuarioId) {
    http_response_code(409);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Email já está em uso']);
    exit;
}

// Atualiza os dados
$resultado = $model->atualizarPerfil($usuarioId, $nome, $email);

if (!$resultado) {
    http_response_code(500);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao atualizar perfil']);
    exit;
}

// Atualiza a sessão com os novos dados
$_SESSION['usuario']['nome'] = $nome;
$_SESSION['usuario']['email'] = $email;

http_response_code(200);
echo json_encode([
    'sucesso' => true,
    'mensagem' => 'Perfil atualizado com sucesso',
    'usuario' => [
        'nome' => $nome,
        'email' => $email
    ]
]);
exit;
