<?php

header('Content-Type: application/json');

require_once __DIR__ . '/../../config/config.php';
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
    'POST' => adicionarNoCarrinho(),
    default => metodoNaoPermitido()
};

function adicionarNoCarrinho() {
    global $usuario_id, $carrinhoModel;

    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['produto_id'])) {
        http_response_code(400);
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Produto inválido'
        ]);
        exit;
    }

    $produto_id = $input['produto_id'];
    $quantidade = $input['quantidade'] ?? 1;

    try {
        $carrinhoModel->adicionarAoCarrinho($usuario_id, $produto_id, $quantidade);

        echo json_encode([
            'sucesso' => true,
            'mensagem' => 'Produto adicionado ao carrinho'
        ]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Erro ao adicionar ao carrinho'
        ]);
    }

    exit;
}