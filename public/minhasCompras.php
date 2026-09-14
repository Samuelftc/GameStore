<?php

$tituloPagina = 'GameStore - Minhas Compras';
$paginaMinhasCompras = true;
require_once '../config/config.php';

?>

<!DOCTYPE html>
<html lang="pt-BR">

<?php include INCLUDES_PATH . "/head.php" ?>

<body>
    <?php include INCLUDES_PATH . "/header.php"; ?>

    <main>
        <div class="containerMinhasCompras">
            <h1>Minhas compras</h1>

            <ul class="listaMinhasCompras" id="listaMinhasCompras"></ul>
            <p id="semCompras" class="semCompras"></p>

            <a href="index.php" class="voltarHome">Voltar para home</a>
        </div>
    </main>

    <?php include INCLUDES_PATH . "/footer.php"; ?>

    <script src="<?= JS_URL ?>/minhasCompras.js" defer></script>
</body>

</html>
