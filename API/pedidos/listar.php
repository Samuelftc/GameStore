<?php

header('Content-Type: application/json');

require_once __DIR__ . '/../../config/config.php';
require_once MODEL_PATH . '/carrinhoModel.php';
require_once MODEL_PATH . '/pedidoModel.php';

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
$pedidoModel = new PedidoModel();

match ($method) {
    'GET' => listarPedidos(),
    default => metodoNaoPermitido()
};

function listarPedidos()
{
    global $usuario_id, $pedidoModel;

    $pedidos = $pedidoModel->obterPedidosPorUsuario($usuario_id);

    foreach ($pedidos as &$pedido) {
        $pedido['itens'] = $pedidoModel->obterItensDoPedido($pedido['id']);
    }

    http_response_code(200);
    echo json_encode([
        'sucesso' => true,
        'pedidos' => $pedidos
    ]);
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