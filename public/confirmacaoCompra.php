<?php

require_once '../config/config.php';

?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?= CSS_URL ?>/confirmacaoCompra.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet">

    <title>Finalização da compra</title>
</head>

<body class="bodyConfirmacao">
    <main class="mainConfirmacao">
        <h1>Compra Confirmada!</h1>
        <article class="containerConfirmacao">
            <p><strong>ID do Pedido: </strong> <span id="idPedido"></span></p>

            <div class="dadosCompra">
                <p><strong>Cliente: </strong> <span id="nomeCliente"></span></p>
                <p><strong>Data da compra: </strong> <span id="dataCompra"></span></p>
                <p><strong>Status da compra: </strong> <span id="statusCompra"></span></p>
            </div>

            <div class="itens">
                <h3>Itens:</h3>
                <ul id="itensCompra"></ul>
            </div>

            <p><strong>Total: </strong> <span id="totalCompra"></span></p>
        </article>

        <a href="<?= BASE_URL ?>/public/index.php" class="btnVoltar" id="btnVoltar">Voltar para home</a>
    </main>

    <script src="<?= JS_URL ?>/confirmacaoCompra.js" defer></script>
</body>

</html>