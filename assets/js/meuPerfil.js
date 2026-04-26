const btnAbrirMeuPerfil = document.getElementById('nomeUsuario');
const btnFecharMeuPerfil = document.getElementById('fecharMeuPerfil');
const containerMeuPerfil = document.getElementById('meuPerfil');

const usuarioLogadoPerfil = JSON.parse(localStorage.getItem('usuarioLogado'));
const pedidosPerfil = JSON.parse(localStorage.getItem('pedidos')) || [];

const nomeDoUsuario = document.getElementById('nomeDoUsuario');
const emailDoUsuario = document.getElementById('emailDoUsuario');
const dataCadastroDoUsuario = document.getElementById('dataCadastroDoUsuario');
const quantidadeComprasFeitas = document.getElementById('quantidadeComprasFeitas');
const buttonSairPerfil = document.getElementById('buttonSairPerfil');

// Verificação
if (!usuarioLogadoPerfil) {
    // window.location.href = 'index.php';
} else {
    const pedidosUsuario = pedidosPerfil.filter(p => p.idUsuario === usuarioLogadoPerfil.id);

    if (nomeDoUsuario) nomeDoUsuario.textContent = usuarioLogadoPerfil.nome;
    if (emailDoUsuario) emailDoUsuario.textContent = usuarioLogadoPerfil.email;
    if (dataCadastroDoUsuario) dataCadastroDoUsuario.textContent = usuarioLogadoPerfil.data;
    if (quantidadeComprasFeitas) quantidadeComprasFeitas.textContent = pedidosUsuario.length;

    if (buttonSairPerfil) {
        buttonSairPerfil.addEventListener('click', () => {
            localStorage.removeItem('usuarioLogado');
            window.location.href = 'index.php';
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