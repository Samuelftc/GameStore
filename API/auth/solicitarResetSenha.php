<?php

header('Content-Type: application/json');

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../models/usuarioModel.php';
require_once __DIR__ . '/../../services/EmailService.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Método não permitido']);
    exit;
}

$email = trim($_POST['email'] ?? '');

if (empty($email)) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Email é obrigatório']);
    exit;
}

$model = new UsuarioModel();
$usuario = $model->buscarPorEmail($email);

if (!$usuario) {
    http_response_code(404);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Email não encontrado']);
    exit;
}

$token = bin2hex(random_bytes(32));
$expira = date('Y-m-d H:i:s', strtotime('+2 hours'));

$model->salvarTokenReset($usuario['id'], $token, $expira);

$link = BASE_URL . "/public/resetar-senha.php?token=$token";

$emailService = new EmailService();

$sucesso = $emailService->enviarEmail(
    $usuario['email'],
    "Redefinição de senha",
    "
        <h2>Redefinição de senha</h2>
        <p>Olá, {$usuario['nome']}.</p>
        <p>Você solicitou a redefinição de senha no nosso site.</p>
        <p>
            <a href='{$link}'>Clique aqui para redefinir sua senha</a>
        </p>
        <p>Esse link expira em 2 horas.</p>
        <p>Esse link só pode ser usado uma vez.</p>
    "
);

if ($sucesso) {
    http_response_code(200);
    echo json_encode(['sucesso' => true, 'mensagem' => 'Email enviado com sucesso']);
} else {
    http_response_code(500);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao enviar email']);
}