<?php

header('Content-Type: application/json');
require_once __DIR__ . '/../../config/config.php';
require_once MODEL_PATH . '/produtosModel.php';

$produtosModel = new ProdutosModel();

$method = $_SERVER['REQUEST_METHOD'];

match ($method) {
    'GET' => listarHardware(),
    default => metodoNaoPermitido()
};

function listarHardware()
{
    global $produtosModel;

    $hardware = $produtosModel->listarPorTipo('hardware');

    echo json_encode([
        'sucesso' => true,
        'hardware' => $hardware
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
