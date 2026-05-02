const btnAbrirMeuPerfil = document.getElementById('nomeUsuario');
const btnFecharMeuPerfil = document.getElementById('fecharMeuPerfil');
const containerMeuPerfil = document.getElementById('meuPerfil');

const nomeDoUsuario = document.getElementById('nomeDoUsuario');
const emailDoUsuario = document.getElementById('emailDoUsuario');
const dataCadastroDoUsuario = document.getElementById('dataCadastroDoUsuario');
const quantidadeComprasFeitas = document.getElementById('quantidadeComprasFeitas');
const buttonSairPerfil = document.getElementById('buttonSairPerfil');

// Agora usa usuarioLogado do PHP (head.php) em vez do localStorage
if (usuarioLogado) {
    if (nomeDoUsuario) nomeDoUsuario.textContent = usuarioLogado.nome;
    if (emailDoUsuario) emailDoUsuario.textContent = usuarioLogado.email;
    if (dataCadastroDoUsuario) dataCadastroDoUsuario.textContent = usuarioLogado.criado_em ?? '-';
    if (quantidadeComprasFeitas) quantidadeComprasFeitas.textContent = '0';

    if (buttonSairPerfil) {
        buttonSairPerfil.addEventListener('click', async () => {
            await fetch(`${BASE_URL}/API/auth/logout.php`);
            localStorage.clear();
            window.location.href = `${BASE_URL}/public/index.php`;
        });
    }
}

if (btnAbrirMeuPerfil && containerMeuPerfil) {
    btnAbrirMeuPerfil.addEventListener('click', () => {
        containerMeuPerfil.classList.add('ativo');
    });
}

if (btnFecharMeuPerfil) {
    btnFecharMeuPerfil.addEventListener('click', () => {
        containerMeuPerfil.classList.remove('ativo');
    });
}