<?php 

require_once __DIR__ . "/../../config/config.php";
require_once __DIR__ . "/../../models/usuarioModel.php";

session_start();

$model = new UsuarioModel();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

$token = $_POST['token'] ?? '';
$senha = trim($_POST['senha'] ?? '');
$confirmar = trim($_POST['confirmar'] ?? '');

if (empty($senha) || empty($confirmar)) {
    $_SESSION['erro'] = "Preencha todos os campos.";
    header("Location: " . BASE_URL . "/public/resetar-senha.php?token=$token");
    exit;
}

if ($senha !== $confirmar) {
    $_SESSION['erro'] = "As senhas não coincidem.";
    header("Location: " . BASE_URL . "/public/resetar-senha.php?token=$token");
    exit;
}

$regex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/';
if (!preg_match($regex, $senha)) {
    $_SESSION['erro'] = "Requisitos de senha não atendidos.";
    header("Location: " . BASE_URL . "/public/resetar-senha.php?token=$token");
    exit;
}

$usuario = $model->buscarPorToken($token);

if (!$usuario) {
    $_SESSION['erro'] = "Link inválido ou já utilizado.";
    header("Location: " . BASE_URL . "/public/resetar-senha.php?token=$token");
    exit;
}

if (strtotime($usuario['expiracao_token']) < time()) {
    $_SESSION['erro'] = "Link expirado.";
    header("Location: " . BASE_URL . "/public/resetar-senha.php?token=$token");
    exit;
}

$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

$result = $model->atualizarSenhaComToken($token, $senhaHash);

if ($result === 0) {
    $_SESSION['erro'] = "Erro ao atualizar a senha.";
    header("Location: " . BASE_URL . "/public/resetar-senha.php?token=$token");
    exit;
}

header("Location: " . BASE_URL . "/public/senha-redefinida.php");
exit;