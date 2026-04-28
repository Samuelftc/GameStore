<?php

require_once '../config/config.php';

?>

<header>
    <span>
        <a href="<?= BASE_URL ?>/public/index.php" style="text-decoration: none; color: inherit;">
            Game<b>Store</b>
        </a>
    </span>

    <?php if (!isset($paginaCheckout) && !isset($paginaAuth) && !isset($paginaMinhasCompras)) : ?>

        <nav class="navegacao">
            <ul class="listaNavegacao">
                <li><a href="<?= BASE_URL ?>/public/index.php">Home</a></li>
                <li><a href="<?= BASE_URL ?>/public/catalogo.php">Catálogo</a></li>
                <li><a href="<?= BASE_URL ?>/public/hardware.php">Hardware</a></li>
                <li><a href="#">Comunidade</a></li>
            </ul>
        </nav>

        <div class="divBarraDePesquisa">
            <input type="text" placeholder="Buscar jogos..." class="inputBarraDePesquisa" id="inputBarraDePesquisa">
            <button type="button" aria-label="Buscar">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>

        <div id="resultadosPesquisa" class="resultadosPesquisa"></div>

        <ul class="iconesHeader">

            <li id="liNomeUsuario" style="display: none;">
                <button id="nomeUsuario"></button>
            </li>

            <li id="liLogin">
                <button type="button" id="botaoLogin">
                    <i class="fa-solid fa-user"></i> 
                    <p>Login</p>
                </button>
            </li>

            <li class="carrinhoHeader" id="carrinhoHeader">
                <button type="button" id="botaoCarrinho">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <p>Carrinho</p>
                </button>
            </li>
        </ul>

        <button class="btnMenuMobile" id="btnMenuMobile">
            <i class="fa-solid fa-bars"></i>
        </button>
    <?php endif ?>
</header>