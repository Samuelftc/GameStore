<?php

header('Content-Type: application/json');

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../models/produtosModel.php';

$termo = trim($_GET['termo'] ?? '');

if (empty($termo) || strlen($termo) < 2) {
    echo json_encode(['sucesso' => false, 'produtos' => []]);
    exit;
}

$model = new ProdutosModel();

try {
    $jogos = $model->listarPorBusca($termo, 'jogo');
    $hardware = $model->listarPorBusca($termo, 'hardware');

    $produtos = array_merge($jogos, $hardware);

    echo json_encode([
        'sucesso' => true,
        'produtos' => $produtos
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Erro ao buscar produtos',
        'produtos' => []
    ]);
}
exit;
