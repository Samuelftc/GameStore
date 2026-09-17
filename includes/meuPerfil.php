<aside class="meuPerfil" id="meuPerfil">
    <div class="topoMeuPerfil">
        <h2>Meu Perfil</h2>
        <button class="fecharMeuPerfil" id="fecharMeuPerfil">❌</button>
    </div>

    <!-- ABA: Dados do Usuário -->
    <div class="abaPerfil" id="abaDados">
        <div class="dadosUsuarios">
            <p class="nomeDoUsuario" id="nomeDoUsuario"></p>
            <p class="emailDoUsuario" id="emailDoUsuario"></p>
            <p>Data de Cadastro: <span class="dataCadastroDoUsuario" id="dataCadastroDoUsuario"></span></p>
            <p>Quantidade de compras feitas: <span class="quantidadeComprasFeitas" id="quantidadeComprasFeitas"></span></p>
        </div>

        <ul class="botoesNavegacao">
            <li><a href="#" class="buttonNavMeuPerfil" id="buttonAlterarDados">Alterar dados</a></li>
            <li><a href="#" class="buttonNavMeuPerfil" id="buttonAlterarSenha">Alterar Senha</a></li>
            <li><a href="<?= BASE_URL ?>/public/minhasCompras.php" class="buttonNavMeuPerfil" id="buttonMinhasCompras">Minhas Compras</a></li>
        </ul>

        <button id="buttonSairPerfil"><i class="fa-solid fa-left-long"></i> Sair da conta</button>
    </div>

    <!-- ABA: Alterar Dados -->
    <div class="abaPerfil" id="abaAlterarDados" style="display: none;">
        <button id="voltarParaDados" class="btnVoltar"><i class="fa-solid fa-arrow-left"></i> Voltar</button>

        <div id="avisoAtualizacao" class="alerta-sucesso" style="display: none; margin: 15px 0;"></div>
        <div id="erroAtualizacao" class="alerta-erro" style="display: none; margin: 15px 0;"></div>

        <form class="formAlterarDados" id="formAlterarDados">
            <div class="campoPerfil">
                <label for="inputNomePerfil">Nome Completo:</label>
                <input
                    type="text"
                    id="inputNomePerfil"
                    name="nome"
                    class="inputPerfil"
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
                    required
                >
            </div>

            <button type="submit" id="submitEditarPerfil" class="btnPerfil">Salvar Alterações</button>
        </form>
    </div>

</aside>