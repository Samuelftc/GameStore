<?php

$tituloPagina = 'GameStore - Checkout';
$paginaCheckout = true;
require_once '../config/config.php';

?>

<!DOCTYPE html>
<html lang="pt-br">

<?php include INCLUDES_PATH . "/head.php" ?>

<body class="bodyCheckout">
    <?php include INCLUDES_PATH . '/header.php'; ?>

    <main class="mainCheckout">
        <div class="containerCheckout">
            <h1 class="tituloCheckout">Checkout</h1>
            <h2>Resumo do pedido</h2>
            <ul class="informacoesCheckout" id="informacoesCheckout"></ul>

            <div class="resumoFinalCheckout">
                <p>Total: R$ <span id="totalCheckout">00,00</span></p>
                <button type="button" class="btnPagar" id="btnPagar">Pagar</button>
            </div>
        </div>
    </main>

    <?php include INCLUDES_PATH . '/footer.php'; ?>
    <script src="<?= JS_URL ?>/checkout.js" defer></script>
</body>

</html>