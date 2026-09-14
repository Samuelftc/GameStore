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
    'GET' => obterPedidoEspecifico(),
    default => metodoNaoPermitido()
};

function obterPedidoEspecifico()
{
    global $usuario_id, $pedidoModel;

    if (!isset($_GET['pedido_id'])) {
        http_response_code(400);
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'ID do pedido não fornecido'
        ]);
        exit;
    }

    $pedido_id = $_GET['pedido_id'];

    $pedido = $pedidoModel->obterPedidoPorIdDoUsuario($usuario_id, $pedido_id);

    if (!$pedido) {
        http_response_code(404);
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Pedido não encontrado'
        ]);
        exit;
    }

    $pedido['itens'] = $pedidoModel->obterItensDoPedido($pedido_id);

    http_response_code(200);
    echo json_encode([
        'sucesso' => true,
        'pedido' => $pedido
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