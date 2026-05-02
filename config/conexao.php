<?php 

/**
 * Faz a conexão com banco de dados via PDO (mais seguro)
 */

// Configurações de acesso ao banco de dados
$host = "localhost";
$user = "root";
$password = "";
$banco = "gamestore";
$charset = "utf8mb4";

// Array de configurações da conexão
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,

    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
];

$dsn = "mysql:host=$host;dbname=$banco;charset=$charset";

try {
    // Cria a conexão
    $pdo = new PDO(
        $dsn,
        $user,
        $password,
        $options
    );
    return $pdo;
} catch (PDOException $e) {
    // Interrompe o código caso a conexão falhe
    die("Erro na conexão com o banco.");
}

?>