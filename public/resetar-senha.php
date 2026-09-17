<?php

session_start();
$tituloPagina = 'GameStore - Redefinir Senha';
$paginaAuth = true;
require_once '../config/config.php';

$token = $_GET['token'] ?? '';
$erro = $_SESSION['erro'] ?? '';
unset($_SESSION['erro']);

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
                <h1>Redefinir Senha</h1>

                <?php if (!empty($erro)): ?>
                    <div class="alerta-erro">
                        <p><?= htmlspecialchars($erro) ?></p>
                    </div>
                <?php endif; ?>

                <?php if (!empty($token)): ?>
                    <form class="formAuth" id="formResetSenha" method="POST" action="<?= API_URL ?>/auth/recuperar-senha.php">
                        <input type="hidden" name="token" value="<?= htmlspecialchars($token) ?>">

                        <div class="inputSenhaWrapper">
                            <input type="password" class="inputAuth" name="senha" id="inputNovaSenha" placeholder="Nova Senha" required>
                            <i class="fa-regular fa-eye toggleSenha"></i>
                        </div>

                        <div class="inputSenhaWrapper">
                            <input type="password" class="inputAuth" name="confirmar" id="inputConfirmarSenha" placeholder="Confirmar Senha" required>
                            <i class="fa-regular fa-eye toggleSenha"></i>
                        </div>

                        <small style="color: #888; display: block; margin: 10px 0; text-align: left;">
                            A senha deve ter no mínimo 8 caracteres, pelo menos uma letra maiúscula, uma minúscula, um número e um símbolo especial.
                        </small>

                        <button type="submit" id="submitResetSenha">Redefinir Senha</button>

                        <a href="<?= BASE_URL ?>/public/auth.php">Voltar para Login</a>
                    </form>
                <?php else: ?>
                    <div class="alerta-erro">
                        <p>Token inválido ou ausente. <a href="<?= BASE_URL ?>/public/auth.php">Volte ao login</a></p>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </main>

    <?php include INCLUDES_PATH . "/footer.php"; ?>

    <script src="<?= JS_URL ?>/auth.js"></script>
    <script src="<?= JS_URL ?>/recuperarSenha.js"></script>
</body>

</html>
