<?php

class UsuarioModel
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = require_once __DIR__ . '/../config/conexao.php';
    }

    public function cadastrarUsuario($dados)
    {
        $sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$dados['nome'], $dados['email'], $dados['senha']]);

        return $this->pdo->lastInsertId();
    }

    public function buscarPorId($id)
    {
        $sql = "SELECT * FROM usuarios WHERE id = ? AND status = 1";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);

        return $stmt->fetch();
    }

    public function buscarPorEmail($email)
    {
        $sql = "SELECT * FROM usuarios WHERE email = ? AND status = 1";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$email]);

        return $stmt->fetch();
    }

    public function emailExiste($email)
    {
        $sql = "SELECT id FROM usuarios WHERE email = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$email]);

        return $stmt->fetch() !== false;
    }

    public function atualizarSenha($id, $novaSenha)
    {
        $sql = "UPDATE usuarios 
            SET senha = ? WHERE id = ?";

        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([$novaSenha, $id]);
    }

    public function salvarTokenReset($id, $token, $expira)
    {
        $sql = "UPDATE usuarios 
            SET reset_token = ?, expiracao_token = ? 
            WHERE id = ?";

        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([$token, $expira, $id]);
    }

    public function buscarPorToken($token)
    {
        $sql = "SELECT * FROM usuarios 
            WHERE reset_token = ? 
            AND expiracao_token > NOW()
            AND status = 1";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$token]);

        return $stmt->fetch();
    }

    public function atualizarSenhaComToken($token, $senhaHash)
    {
        $sql = "UPDATE usuarios
        SET senha = ?,
            reset_token = NULL,
            expiracao_token = NULL
        WHERE reset_token = ?
        AND expiracao_token > NOW()";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$senhaHash, $token]);

        return $stmt->rowCount();
    }

    public function atualizarPerfil($id, $nome, $email)
    {
        $sql = "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([$nome, $email, $id]);
    }
}
