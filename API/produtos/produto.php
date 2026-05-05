<?php

header('Content-Type: application/json');
require_once __DIR__ . '/../../config/config.php';
require_once MODEL_PATH . '/produtosModel.php';

$produtosModel = new ProdutosModel();

$method = $_SERVER['REQUEST_METHOD'];

match ($method) {
    'GET' => obterProduto(),
    default => metodoNaoPermitido()
};

function obterProduto()
{
    global $produtosModel;

    $id = $_GET['id'] ?? null;

    if (!$id) {
        http_response_code(400);
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'ID do produto é obrigatório'
        ]);
        exit;
    }

    $produto = $produtosModel->obterProdutoPorId($id);

    if (!$produto) {
        http_response_code(404);
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Produto não encontrado'
        ]);
        exit;
    }

    echo json_encode([
        'sucesso' => true,
        'produto' => $produto
    ]);
    exit;
}