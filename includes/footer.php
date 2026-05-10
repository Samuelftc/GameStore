<?php

require_once '../config/config.php';

?>

<footer id="rodape">
    <div id="blocosFooter">

        <div id="basicoRodape">
            <h3>GameStore</h3>
            <p>Sua loja de jogos preferida com os melhores preços e atendimento.</p>
            <ul>
                <li><i class="fa-solid fa-mobile"></i></li>
                <li><i class="fa-brands fa-instagram"></i></li>
                <li><i class="fa-brands fa-twitter"></i></li>
            </ul>
        </div>

        <?php if(!isset($paginaCheckout) && !isset($paginaAuth) && !isset($paginaMinhasCompras)) : ?>

        <div class="blocoFooter">
            <h3>Links Rápidos</h3>
            <ul>
                <li><a href="<?= BASE_URL ?>/public/index.php">Início</a></li>
                <li><a href="<?= BASE_URL ?>/public/catalogo.php">Catálogo</a></li>
                <li><a href="<?= BASE_URL ?>/public/hardware.php">Hardware</a></li>
                <li><a href="#">Comunidade</a></li>
            </ul>
        </div>

        <div class="blocoFooter">
            <h3>Suporte</h3>
            <ul>
                <li><a href="#">Central de Ajuda</a></li>
                <li><a href="#">Contato</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Trocas e Devoluções</a></li>
            </ul>
        </div>

        <?php endif ?>

        <div class="blocoFooter" id="contatoFooter">
            <h3>Contato</h3>
            <ul>
                <li>
                    <i class="fa-solid fa-envelope"></i>
                    <a href="mailto:contato@gamestore.com?subject=Contato%20via%20site&body=Olá,%20gostaria%20de%20mais%20informações.">
                        contato@gamestore.com
                    </a>
                </li>

                <li>
                    <i class="fa-solid fa-phone"></i>
                    <a href="tel:+5511950486252">(11) 95048-6252</a>
                </li>

                <li>
                    <i class="fa-solid fa-location-dot"></i>
                    <a href="#" target="_blank">São Paulo, SP</a>
                </li>

                <li>
                    <i class="fa-regular fa-clock"></i>
                    <p>24/7</p>
                </li>
            </ul>
        </div>

    </div>

    <hr>

    <p id="copyright">
        &copy; <?= date('Y'); ?> GameStore. Todos os direitos reservados.
    </p>
</footer>

<script src="<?= JS_URL ?>/main.js" defer></script>
<script src="<?= JS_URL ?>/carrinho.js" defer></script>
<script src="<?= JS_URL ?>/meuPerfil.js" defer></script>
<script src="<?= JS_URL ?>/animacoes.js" defer></script>
<script src="<?= JS_URL ?>/campoDeBusca.js" defer></script>