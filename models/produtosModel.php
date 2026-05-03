<?php

class ProdutosModel
{

    private $pdo;

    public function __construct()
    {
        $this->pdo = require_once __DIR__ . '/../config/conexao.php';
    }

    public function listarTodos()
    {
        $sql = "SELECT * FROM produtos WHERE status = 1";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll();
    }

    public function listarPorTipo($tipo)
    {
        $sql = "SELECT * FROM produtos WHERE tipo = ? AND status = 1";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$tipo]);
        return $stmt->fetchAll();
    }

    public function obterProdutoPorId($id)
    {
        $sql = "SELECT * FROM produtos WHERE id = ? AND status = 1";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function inserirProduto($dados)
    {
        $sql = "INSERT INTO produtos (nome, descricao, preco, foto, tipo) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$dados['nome'], $dados['descricao'], $dados['preco'], $dados['foto'], $dados['tipo']]);
        return $this->pdo->lastInsertId();
    }

    public function atualizarProduto($id, $dados)
    {
        $sql = "UPDATE produtos SET nome = ?, descricao = ?, preco = ?, foto = ?, tipo = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$dados['nome'], $dados['descricao'], $dados['preco'], $dados['foto'], $dados['tipo'], $id]);
    }

    public function excluirProduto($id)
    {
        $sql = "UPDATE produtos SET status = 0 WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
    }
}

$produtosModel = new ProdutosModel();