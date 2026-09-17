<?php

$tituloPagina = 'GameStore - Senha Redefinida';
$paginaAuth = true;
require_once '../config/config.php';

?>

<!DOCTYPE html>
<html lang="pt-BR">

<script>
    const BASE_URL = "<?= BASE_URL ?>";
</script>

<?php include INCLUDES_PATH . "/head.php" ?>

<body class="bodyAuth">
    <?php include INCLUDES_PATH . "/header.php"; ?>

    <main class="mainAuth">
        <div class="containerSecaoUnica">
            <div class="secaoRecuperacao">
                <h1>✓ Sucesso!</h1>

                <div class="alerta-sucesso">
                    <p>Sua senha foi redefinida com sucesso!</p>
                    <p style="margin-top: 10px; font-size: 14px;">
                        Agora você pode fazer login com sua nova senha.
                    </p>
                </div>

                <a href="<?= BASE_URL ?>/public/auth.php" style="display: block; text-align: center; margin-top: 20px; padding: 12px 20px; background-color: #27ae60; color: white; border-radius: 5px; text-decoration: none; font-weight: bold;">
                    Ir para Login
                </a>

                <a href="<?= BASE_URL ?>/index.php" style="display: block; text-align: center; margin-top: 10px; padding: 12px 20px; background-color: transparent; color: #27ae60; border: 2px solid #27ae60; border-radius: 5px; text-decoration: none; font-weight: bold;">
                    Voltar para Home
                </a>
            </div>
        </div>
    </main>

    <?php include INCLUDES_PATH . "/footer.php"; ?>

    <script src="<?= JS_URL ?>/auth.js"></script>
</body>

</html>
