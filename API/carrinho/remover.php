<?php

header('Content-Type: application/json');

require_once __DIR__ . '/../../config/config.php';
require_once MODEL_PATH . '/carrinhoModel.php';
require_once MODEL_PATH . '/produtosModel.php';

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
$produtoModel = new ProdutosModel();

match ($method) {
    'DELETE'    => removerItem(),
    default  => metodoNaoPermitido()
};

function removerItem()
{
    global $carrinhoModel, $usuario_id, $produtoModel;

    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        http_response_code(400);

        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'JSON inválido'
        ]);

        exit;
    }

    if (!isset($input['produto_id'])) {
        http_response_code(400);

        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Dados inválidos'
        ]);

        exit;
    }

    $produto_id = $input['produto_id'];

    $produto = $produtoModel->obterProdutoPorId($produto_id);

    if (!$produto) {
        http_response_code(404);

        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Produto não encontrado'
        ]);

        exit;
    }

    $itemCarrinho = $carrinhoModel->obterItemCarrinho($usuario_id, $produto_id);

    if (!$itemCarrinho) {
        http_response_code(404);

        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Item não encontrado no carrinho'
        ]);

        exit;
    }

    try {
        $carrinhoModel->removerDoCarrinho($itemCarrinho['id']);

        echo json_encode([
            'sucesso' => true,
            'mensagem' => "{$produto['nome']} removido do carrinho"
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Erro ao excluir item'
        ]);
    }
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
