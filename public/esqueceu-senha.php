<?php

$tituloPagina = 'GameStore - Esqueceu a Senha';
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
                <h1>Recuperar Senha</h1>

                <p>Digite seu email e enviaremos um link para redefinir sua senha.</p>

                <form class="formAuth" id="formEsqueceuSenha" method="POST" action="<?= API_URL ?>/auth/solicitarResetSenha.php">
                    <input
                        type="email"
                        class="inputAuth"
                        name="email"
                        id="inputEmailRecuperacao"
                        placeholder="Seu e-mail"
                        required
                    >

                    <button type="submit" id="submitRecuperacao">Enviar Link de Recuperação</button>

                    <a href="<?= BASE_URL ?>/public/auth.php">Voltar para Login</a>
                </form>
            </div>
        </div>
    </main>

    <?php include INCLUDES_PATH . "/footer.php"; ?>

    <script src="<?= JS_URL ?>/auth.js"></script>
    <script src="<?= JS_URL ?>/recuperarSenha.js"></script>
</body>

</html>
