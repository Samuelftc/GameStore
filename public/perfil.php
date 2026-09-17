<?php

session_start();
$tituloPagina = 'GameStore - Meu Perfil';
// $cssExtra = 'perfil.css';
require_once '../config/config.php';

// Verifica se usuário tá logado
if (!isset($_SESSION['usuario'])) {
    header("Location: " . BASE_URL . "/public/auth.php");
    exit;
}

$usuario = $_SESSION['usuario'];

?>

<!DOCTYPE html>
<html lang="pt-BR">

<script>
    const BASE_URL = "<?= BASE_URL ?>";
</script>

<?php include INCLUDES_PATH . "/head.php" ?>

<body>
    <?php include INCLUDES_PATH . "/header.php"; ?>

    <main class="mainPerfil">
        <div class="containerPerfil">

            <div class="secaoPerfil">
                <h1>Meu Perfil</h1>

                <div class="infosUsuario">
                    <div class="infoItem">
                        <label>Nome:</label>
                        <p><?= htmlspecialchars($usuario['nome']) ?></p>
                    </div>
                    <div class="infoItem">
                        <label>Email:</label>
                        <p><?= htmlspecialchars($usuario['email']) ?></p>
                    </div>
                    <div class="infoItem">
                        <label>Membro desde:</label>
                        <p><?= htmlspecialchars($usuario['criado_em']) ?></p>
                    </div>
                </div>

                <div id="avisoAtualizacao" class="alerta-sucesso" style="display: none; margin-top: 20px;"></div>
                <div id="erroAtualizacao" class="alerta-erro" style="display: none; margin-top: 20px;"></div>

                <form class="formPerfil" id="formEditarPerfil">
                    <h2>Editar Perfil</h2>

                    <div class="campoPerfil">
                        <label for="inputNomePerfil">Nome Completo:</label>
                        <input
                            type="text"
                            id="inputNomePerfil"
                            name="nome"
                            class="inputPerfil"
                            value="<?= htmlspecialchars($usuario['nome']) ?>"
                            required
                        >
                    </div>

                    <div class="campoPerfil">
                        <label for="inputEmailPerfil">Email:</label>
                        <input
                            type="email"
                            id="inputEmailPerfil"
                            name="email"
                            class="inputPerfil"
                            value="<?= htmlspecialchars($usuario['email']) ?>"
                            required
                        >
                    </div>

                    <button type="submit" id="submitEditarPerfil" class="btnPerfil">Salvar Alterações</button>
                </form>

                <div class="acoesPerfil">
                    <a href="<?= BASE_URL ?>/public/perfil.php?aba=senha" class="linkPerfil">Trocar Senha</a>
                    <a href="<?= BASE_URL ?>/public/minhasCompras.php" class="linkPerfil">Minhas Compras</a>
                </div>

            </div>

        </div>
    </main>

    <?php include INCLUDES_PATH . "/footer.php"; ?>

    <script src="<?= JS_URL ?>/perfil.js"></script>
</body>

</html>
