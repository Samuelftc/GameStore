<?php

// header("Content-Type: application/json");

// require_once __DIR__ . '/../config/config.php';
// require_once MODEL_PATH . '/carrinhoModel.php';

// if (session_status() === PHP_SESSION_NONE) {
//     session_start();
// }

// // Verifica se está logado
// if (!isset($_SESSION['usuario'])) {
//     http_response_code(401);
//     echo json_encode([
//         'sucesso' => false,
//         'mensagem' => 'Não autorizado'
//     ]);
//     exit;
// }

// $usuario_id = $_SESSION['usuario']['id'];

// $method = $_SERVER['REQUEST_METHOD'];

// $carrinhoModel = new CarrinhoModel();

// match ($method) {
//     'GET'    => obterCarrinho(),
//     'POST'   => adicionarItem(),
//     'PUT'    => atualizarItem(),
//     'DELETE' => removerItem(),
//     default  => metodNaoPermitido()
// };

// function obterCarrinho()
// {
//     global $carrinhoModel, $usuario_id;

//     $carrinho = $carrinhoModel->obterCarrinhoPorUsuario($usuario_id);

//     echo json_encode([
//         'sucesso' => true,
//         'carrinho' => $carrinho
//     ]);
//     exit;
// }

// function adicionarItem()
// {
//     global $carrinhoModel, $usuario_id;

//     $dados = json_decode(file_get_contents('php://input'), true);
//     $dados['usuario_id'] = $usuario_id;

//     // Verifica se o item já está no carrinho
//     $itemExistente = $carrinhoModel->verificarItemNoCarrinho($usuario_id, $dados['produto_id']);

//     if ($itemExistente) {
//         // Se já estiver, atualiza a quantidade
//         $novaQuantidade = $itemExistente['quantidade'] + 1;
//         $carrinhoModel->atualizarQuantidade($itemExistente['id'], $novaQuantidade);
//     } else {
//         // Se não estiver, adiciona ao carrinho
//         $carrinhoModel->adicionarAoCarrinho($dados);
//     }

//     echo json_encode([
//         'sucesso' => true,
//         'mensagem' => 'Item adicionado ao carrinho'
//     ]);
//     exit;
// }
