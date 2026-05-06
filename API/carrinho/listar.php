<?php

header("Content-Type: application/json");

require_once __DIR__ . '/../config/config.php';
require_once MODEL_PATH . '/carrinhoModel.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['usuario'])) {
    http_response_code(401);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Não autorizado'
    ]);
    exit;
}

$usuario_id = $_SESSION['usuario']['id'];

$method = $_SERVER['REQUEST_METHOD'];

$carrinhoModel = new CarrinhoModel();

match ($method) {
    'GET'    => obterCarrinho(),
    default  => metodoNaoPermitido()
};

function obterCarrinho()
{
    global $carrinhoModel, $usuario_id;

    $carrinho = $carrinhoModel->obterCarrinhoPorUsuario($usuario_id);

    $total = 0;

    foreach ($carrinho as $item) {
        $total += $item['produto_preco'] * $item['quantidade'];
    }

    echo json_encode([
        'sucesso' => true,
        'carrinho' => $carrinho,
        'total' => $total
    ]);
    exit;
}

function metodoNaoPermitido()
{
    http_response_code(405);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Método não permitido'
    ]);
    exit;
}
