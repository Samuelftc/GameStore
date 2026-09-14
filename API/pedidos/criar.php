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
    'POST' => criarPedido(),
    default => metodoNaoPermitido()
};

function criarPedido()
{
    global $usuario_id, $carrinhoModel, $pedidoModel;

    $carrinho = $carrinhoModel->obterCarrinhoPorUsuario($usuario_id);

    if (empty($carrinho)) {
        http_response_code(400);
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Carrinho vazio'
        ]);
        exit;
    }

    $total = array_reduce($carrinho, function($acc, $item) {
        return $acc + ($item['produto_preco'] * $item['quantidade']);
    }, 0);

    $pedido_id = $pedidoModel->criarPedido($usuario_id, $total);

    if ($pedido_id) {
        foreach ($carrinho as $item) {
            $pedidoModel->adicionarItemPedido($pedido_id, $item['produto_id'], $item['quantidade'], $item['produto_preco']);
        }

        $carrinhoModel->limparCarrinho($usuario_id);

        http_response_code(201);
        echo json_encode([
            'sucesso' => true,
            'mensagem' => 'Pedido criado com sucesso',
            'pedido_id' => $pedido_id
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Erro ao criar pedido'
        ]);
    }
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