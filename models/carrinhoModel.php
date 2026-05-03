<?php

class CarrinhoModel
{

    private $pdo;

    public function __construct()
    {
        $this->pdo = require_once __DIR__ . '/../config/conexao.php';
    }

    public function adicionarAoCarrinho($dados)
    {
        $sql = "INSERT INTO carrinho (usuario_id, produto_id) VALUES (?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$dados['usuario_id'], $dados['produto_id']]);
    }

    public function obterCarrinhoPorUsuario($usuario_id)
    {
        $sql = "SELECT c.*, p.nome AS produto_nome, p.preco AS produto_preco FROM carrinho c JOIN produtos p ON c.produto_id = p.id WHERE c.usuario_id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$usuario_id]);

        return $stmt->fetchAll();
    }

    public function atualizarQuantidade($carrinho_id, $quantidade)
    {
        $sql = "UPDATE carrinho SET quantidade = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$quantidade, $carrinho_id]);
    }

    public function verificarItemNoCarrinho($usuario_id, $produto_id)
    {
        $sql = "SELECT * FROM carrinho WHERE usuario_id = ? AND produto_id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$usuario_id, $produto_id]);

        return $stmt->fetch();
    }

    public function removerDoCarrinho($carrinho_id)
    {
        $sql = "DELETE FROM carrinho WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$carrinho_id]);
    }
}
