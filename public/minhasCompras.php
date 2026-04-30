<?php
$paginaMinhasCompras = true;
require_once '../config/config.php';

?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?= CSS_URL ?>/main.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet">

    <title>Minhas Compras</title>
</head>

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