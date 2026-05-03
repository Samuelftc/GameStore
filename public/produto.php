<?php 

$tituloPagina = 'GameStore - Detalhes do produto';
require_once '../config/config.php'; 

?>

<!DOCTYPE html>
<html lang="pt-BR">

<?php include INCLUDES_PATH . "/head.php" ?>

<body>
    <?php include INCLUDES_PATH . '/header.php'; ?>
    <?php include INCLUDES_PATH . '/carrinho.php'; ?>
    <?php include INCLUDES_PATH . '/meuPerfil.php'; ?>

    <main>
        <?php include INCLUDES_PATH . '/carrinho.php'; ?>

        <div id="produtoContainer" class="section2"></div>
    </main>

    <?php include INCLUDES_PATH . '/footer.php'; ?>

    <script type="module" src="<?= JS_URL ?>/produto.js" defer></script>
</body>

</html>