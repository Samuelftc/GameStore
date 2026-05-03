-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gamestore
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

/*!50503 SET NAMES utf8 */;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;

/*!40103 SET TIME_ZONE='+00:00' */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `itens_pedido`
--
DROP TABLE IF EXISTS `itens_pedido`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `itens_pedido` (
    `id` int (10) unsigned NOT NULL AUTO_INCREMENT,
    `pedido_id` int (10) unsigned NOT NULL,
    `produto_id` int (10) unsigned NOT NULL,
    `quantidade` int (10) unsigned NOT NULL,
    `preco_unitario` decimal(10, 2) NOT NULL,
    `criado_em` datetime DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    KEY `fk_itens_pedido_pedido` (`pedido_id`),
    KEY `fk_itens_pedido_produto` (`produto_id`),
    CONSTRAINT `fk_itens_pedido_pedido` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`),
    CONSTRAINT `fk_itens_pedido_produto` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newsletter`
--
DROP TABLE IF EXISTS `newsletter`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `newsletter` (
    `id` int (10) unsigned NOT NULL AUTO_INCREMENT,
    `email` varchar(150) NOT NULL,
    `status` tinyint (1) DEFAULT 1,
    `criado_em` datetime DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_newsletter_email` (`email`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pedidos`
--
DROP TABLE IF EXISTS `pedidos`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `pedidos` (
    `id` int (10) unsigned NOT NULL AUTO_INCREMENT,
    `usuario_id` int (10) unsigned NOT NULL,
    `total` decimal(10, 2) NOT NULL,
    `status` enum ('pendente', 'confirmado', 'cancelado') DEFAULT 'pendente',
    `criado_em` datetime DEFAULT current_timestamp(),
    `atualizado_em` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`id`),
    KEY `fk_pedidos_usuario` (`usuario_id`),
    CONSTRAINT `fk_pedidos_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `produtos`
--
DROP TABLE IF EXISTS `produtos`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

-- Categorias
CREATE TABLE
  categorias (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    CONSTRAINT uq_categorias_nome UNIQUE (nome)
  );

-- Plataformas
CREATE TABLE
  plataformas (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    CONSTRAINT uq_plataformas_nome UNIQUE (nome)
  );

-- Produtos
CREATE TABLE
  produtos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    foto VARCHAR(255),
    alt_foto VARCHAR(255),
    tipo ENUM ('jogo', 'hardware') NOT NULL,
    status TINYINT (1) DEFAULT 1,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );

-- Relacionamento Produtos x Categorias
CREATE TABLE
  produtos_categorias (
    produto_id INT UNSIGNED NOT NULL,
    categoria_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (produto_id, categoria_id),
    CONSTRAINT fk_pc_produto FOREIGN KEY (produto_id) REFERENCES produtos (id),
    CONSTRAINT fk_pc_categoria FOREIGN KEY (categoria_id) REFERENCES categorias (id)
  );

-- Relacionamento Produtos x Plataformas
CREATE TABLE
  produtos_plataformas (
    produto_id INT UNSIGNED NOT NULL,
    plataforma_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (produto_id, plataforma_id),
    CONSTRAINT fk_pp_produto FOREIGN KEY (produto_id) REFERENCES produtos (id),
    CONSTRAINT fk_pp_plataforma FOREIGN KEY (plataforma_id) REFERENCES plataformas (id)
  );

--
-- Table structure for table `usuarios`
--
DROP TABLE IF EXISTS `usuarios`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `usuarios` (
    `id` int (10) unsigned NOT NULL AUTO_INCREMENT,
    `nome` varchar(100) NOT NULL,
    `email` varchar(150) NOT NULL,
    `senha` varchar(255) NOT NULL,
    `status` tinyint (1) DEFAULT 1,
    `criado_em` datetime DEFAULT current_timestamp(),
    `atualizado_em` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_usuarios_email` (`email`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-01 23:42:38
CREATE TABLE
  carrinho (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT UNSIGNED NOT NULL,
    produto_id INT UNSIGNED NOT NULL,
    quantidade INT UNSIGNED NOT NULL DEFAULT 1,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_carrinho_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
    CONSTRAINT fk_carrinho_produto FOREIGN KEY (produto_id) REFERENCES produtos (id)
  );