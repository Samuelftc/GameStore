<?php

require_once __DIR__ . '/../../config/config.php';
require_once MODEL_PATH . '/produtosModel.php';

$method = $_SERVER['REQUEST_METHOD'];

match ($method) {
    'GET' => listarJogos(),
    default => metodoNaoPermitido()
};

function listarJogos()
{
    global $produtosModel;
    
    $jogos = $produtosModel->listarPorTipo('jogo');
    
    header('Content-Type: application/json');

    echo json_encode([
        'sucesso' => true,
        'jogos' => $jogos
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
