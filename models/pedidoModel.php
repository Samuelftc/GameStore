<?php

class PedidoModel
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = require_once __DIR__ . '/../config/conexao.php';
    }

    public function criarPedido($usuario_id, $total, $status = 'pendente')
    {
        $sql = "INSERT INTO pedidos (usuario_id, total, status) VALUES (?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$usuario_id, $total, $status]);

        return $this->pdo->lastInsertId();
    }

    public function obterPedidosPorUsuario($usuario_id)
    {
        $sql = "SELECT * FROM pedidos WHERE usuario_id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$usuario_id]);
        return $stmt->fetchAll();
    }

    public function atualizarStatusPedido($pedido_id, $novo_status)
    {
        $sql = "UPDATE pedidos SET status = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([$novo_status, $pedido_id]);
    }

    public function adicionarItemPedido($pedido_id, $produto_id, $quantidade, $preco)
    {
        $sql = "INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco) VALUES (?, ?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([$pedido_id, $produto_id, $quantidade, $preco]);
    }

    public function obterPedidoPorId($pedido_id)
    {
        $sql = "SELECT * FROM pedidos WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$pedido_id]);
        return $stmt->fetch();
    }

    public function obterItensDoPedido($pedido_id)
    {
        $sql = "SELECT ip.*, p.nome AS produto_nome FROM itens_pedido ip JOIN produtos p ON ip.produto_id = p.id WHERE ip.pedido_id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$pedido_id]);
        return $stmt->fetchAll();
    }

    public function limparCarrinhoPorUsuario($usuario_id)
    {
        $sql = "DELETE FROM carrinho WHERE usuario_id = ?";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([$usuario_id]);
    }
}
