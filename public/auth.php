<?php

$tituloPagina = 'GameStore - Login';
$paginaAuth = true;
require_once '../config/config.php';

?>

<!DOCTYPE html>
<html lang="pt-BR">

<?php include INCLUDES_PATH . "/head.php" ?>

<body class="bodyAuth">
    <?php include INCLUDES_PATH . "/header.php"; ?>

    <main class="mainAuth">
        <div class="containerAuth">

            <!-- AREA DOS FORMS -->
            <div class="areaForm">

                <!-- LOGIN -->
                <div class="divAuth" id="formLogin">
                    <h1>Login</h1>
                    <form class="formAuth" id="formLoginJS">
                        <input type="email" class="inputAuth" id="inputEmailLogin" placeholder="E-mail" required>
                        <div class="inputSenhaWrapper">
                            <input type="password" class="inputAuth" id="inputSenhaLogin" placeholder="Senha" required>
                            <i class="fa-regular fa-eye toggleSenha"></i>
                        </div>
                        <a href="">Esqueceu sua senha?</a>
                        <button type="submit" id="submitLogin">Login</button>
                    </form>
                </div>

                <!-- CADASTRO -->
                <div class="divAuth" id="formCadastro">
                    <h1>Cadastrar</h1>
                    <form class="formAuth" id="formCadastroJS">
                        <input type="text" class="inputAuth" id="inputNomeCadastrar" placeholder="Nome Completo" required>
                        <input type="email" class="inputAuth" id="inputEmailCadastrar" placeholder="E-mail" required>
                        <div class="inputSenhaWrapper">
                            <input type="password" class="inputAuth" id="inputSenhaCadastrar" placeholder="Senha" required>
                            <i class="fa-regular fa-eye toggleSenha"></i>
                        </div>

                        <div class="inputSenhaWrapper">
                            <input type="password" class="inputAuth" id="inputConfirmarSenhaCadastrar" placeholder="Confirmar Senha" required>
                            <i class="fa-regular fa-eye toggleSenha"></i>
                        </div>
                        <div class="divTermos">
                            <input type="checkbox" name="termos" id="termos" required>
                            <label for="termos">Eu concordo com os <a href="">Termos de Uso</a> e a <a href="">Política de Privacidade</a></label>
                        </div>
                        <button type="submit" id="submitCadastrar">Cadastrar</button>
                    </form>
                </div>

            </div>

            <!-- PAINEL LATERAL -->
            <div class="containerSobreposicao">
                <div class="painel" id="painelDireita">
                    <h2>Ainda não tem uma conta?</h2>
                    <p>Crie sua conta e aproveite a melhor loja gamer</p>
                    <button id="cadastrar">Cadastrar</button>
                </div>

                <div class="painel" id="painelEsquerda" style="display: none;">
                    <h2>Já possui conta?</h2>
                    <p>Faça login e continue sua jornada</p>
                    <button id="entrar">Entrar</button>
                </div>
            </div>

        </div>
    </main>


    <?php include INCLUDES_PATH . "/footer.php"; ?>

    <script src="<?= JS_URL ?>/auth.js"></script>
</body>

</html>