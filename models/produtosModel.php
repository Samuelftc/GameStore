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
        $sql = "
        SELECT 
            p.*,
            GROUP_CONCAT(DISTINCT c.nome) AS categorias,
            GROUP_CONCAT(DISTINCT pl.nome) AS plataformas
        FROM produtos p
        LEFT JOIN produtos_categorias pc ON pc.produto_id = p.id
        LEFT JOIN categorias c ON c.id = pc.categoria_id
        LEFT JOIN produtos_plataformas pp ON pp.produto_id = p.id
        LEFT JOIN plataformas pl ON pl.id = pp.plataforma_id
        WHERE p.tipo = ? AND p.status = 1
        GROUP BY p.id
    ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$tipo]);

        $produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($produtos as &$produto) {
            $produto['categorias'] = $produto['categorias']
                ? explode(',', $produto['categorias'])
                : [];

            $produto['plataformas'] = $produto['plataformas']
                ? explode(',', $produto['plataformas'])
                : [];
        }

        return $produtos;
    }

    public function obterProdutoPorId($id)
    {
        $sql = "
        SELECT 
            p.*,
            GROUP_CONCAT(DISTINCT c.nome) AS categorias,
            GROUP_CONCAT(DISTINCT pl.nome) AS plataformas
        FROM produtos p
        LEFT JOIN produtos_categorias pc ON pc.produto_id = p.id
        LEFT JOIN categorias c ON c.id = pc.categoria_id
        LEFT JOIN produtos_plataformas pp ON pp.produto_id = p.id
        LEFT JOIN plataformas pl ON pl.id = pp.plataforma_id
        WHERE p.id = ? AND p.status = 1
        GROUP BY p.id
    ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);

        $produto = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($produto) {
            $produto['categorias'] = $produto['categorias']
                ? explode(',', $produto['categorias'])
                : [];

            $produto['plataformas'] = $produto['plataformas']
                ? explode(',', $produto['plataformas'])
                : [];
        }

        return $produto;
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
