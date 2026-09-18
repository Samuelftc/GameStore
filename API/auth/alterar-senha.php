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
$senhaAtual = $_POST['senhaAtual'] ?? '';
$novaSenha = $_POST['novaSenha'] ?? '';
$confirmarSenha = $_POST['confirmarSenha'] ?? '';

// Validações
if (empty($senhaAtual) || empty($novaSenha) || empty($confirmarSenha)) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Preencha todos os campos']);
    exit;
}

if ($novaSenha !== $confirmarSenha) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'As senhas não coincidem']);
    exit;
}

$regex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/';
if (!preg_match($regex, $novaSenha)) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Senha fraca. Mínimo 8 caracteres, maiúscula, minúscula, número e símbolo']);
    exit;
}

$model = new UsuarioModel();
$usuario = $model->buscarPorId($usuarioId);

if (!$usuario || !password_verify($senhaAtual, $usuario['senha'])) {
    http_response_code(401);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Senha atual incorreta']);
    exit;
}

if ($senhaAtual === $novaSenha) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Nova senha deve ser diferente da atual']);
    exit;
}

$novaSenhaHash = password_hash($novaSenha, PASSWORD_DEFAULT);
$resultado = $model->atualizarSenha($usuarioId, $novaSenhaHash);

if (!$resultado) {
    http_response_code(500);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao alterar senha']);
    exit;
}

http_response_code(200);
echo json_encode([
    'sucesso' => true,
    'mensagem' => 'Senha alterada com sucesso'
]);
exit;
