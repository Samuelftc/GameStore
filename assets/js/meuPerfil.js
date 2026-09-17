const btnAbrirMeuPerfil = document.getElementById('nomeUsuario');
const btnFecharMeuPerfil = document.getElementById('fecharMeuPerfil');
const containerMeuPerfil = document.getElementById('meuPerfil');

const nomeDoUsuario = document.getElementById('nomeDoUsuario');
const emailDoUsuario = document.getElementById('emailDoUsuario');
const dataCadastroDoUsuario = document.getElementById('dataCadastroDoUsuario');
const quantidadeComprasFeitas = document.getElementById('quantidadeComprasFeitas');
const buttonSairPerfil = document.getElementById('buttonSairPerfil');

async function carregarQuantidadeCompras() {
    try {
        const response = await fetch(`${BASE_URL}/API/pedidos/listar.php`);
        if (response.ok) {
            const data = await response.json();
            const quantidade = data.pedidos ? data.pedidos.length : 0;
            if (quantidadeComprasFeitas) {
                quantidadeComprasFeitas.textContent = quantidade;
            }
        }
    } catch (error) {
        console.error('Erro ao buscar quantidade de compras:', error);
        if (quantidadeComprasFeitas) {
            quantidadeComprasFeitas.textContent = '0';
        }
    }
}

// Agora usa usuarioLogado do PHP (head.php) em vez do localStorage
if (usuarioLogado) {
    if (nomeDoUsuario) nomeDoUsuario.textContent = usuarioLogado.nome;
    if (emailDoUsuario) emailDoUsuario.textContent = usuarioLogado.email;
    if (dataCadastroDoUsuario) dataCadastroDoUsuario.textContent = usuarioLogado.criado_em ?? '-';

    carregarQuantidadeCompras();

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

// Navegação entre abas
const abaDados = document.getElementById('abaDados');
const abaAlterarDados = document.getElementById('abaAlterarDados');
const buttonAlterarDados = document.getElementById('buttonAlterarDados');
const voltarParaDados = document.getElementById('voltarParaDados');

if (buttonAlterarDados) {
    buttonAlterarDados.addEventListener('click', (e) => {
        e.preventDefault();
        if (usuarioLogado) {
            document.getElementById('inputNomePerfil').value = usuarioLogado.nome;
            document.getElementById('inputEmailPerfil').value = usuarioLogado.email;
        }
        abaDados.style.display = 'none';
        abaAlterarDados.style.display = 'block';
    });
}

if (voltarParaDados) {
    voltarParaDados.addEventListener('click', (e) => {
        e.preventDefault();
        abaDados.style.display = 'block';
        abaAlterarDados.style.display = 'none';
        document.getElementById('avisoAtualizacao').style.display = 'none';
        document.getElementById('erroAtualizacao').style.display = 'none';
    });
}

// Form alterar dados
const formAlterarDados = document.getElementById('formAlterarDados');
if (formAlterarDados) {
    formAlterarDados.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = document.getElementById('inputNomePerfil').value.trim();
        const email = document.getElementById('inputEmailPerfil').value.trim();
        const btnSubmit = formAlterarDados.querySelector('button[type="submit"]');

        // Validações básicas
        if (!nome || !email) {
            document.getElementById('erroAtualizacao').textContent = 'Por favor, preencha todos os campos';
            document.getElementById('erroAtualizacao').style.display = 'block';
            return;
        }

        if (nome.length < 3) {
            document.getElementById('erroAtualizacao').textContent = 'Nome deve ter no mínimo 3 caracteres';
            document.getElementById('erroAtualizacao').style.display = 'block';
            return;
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            document.getElementById('erroAtualizacao').textContent = 'Email inválido';
            document.getElementById('erroAtualizacao').style.display = 'block';
            return;
        }

        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Salvando...';

        try {
            const response = await fetch(`${BASE_URL}/API/auth/atualizar-perfil.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    nome: nome,
                    email: email
                })
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById('avisoAtualizacao').textContent = data.mensagem;
                document.getElementById('avisoAtualizacao').style.display = 'block';
                document.getElementById('erroAtualizacao').style.display = 'none';

                if (nomeDoUsuario) nomeDoUsuario.textContent = nome;
                if (emailDoUsuario) emailDoUsuario.textContent = email;

                setTimeout(() => {
                    abaDados.style.display = 'block';
                    abaAlterarDados.style.display = 'none';
                    document.getElementById('avisoAtualizacao').style.display = 'none';
                }, 1500);
            } else {
                document.getElementById('erroAtualizacao').textContent = data.mensagem || 'Erro ao atualizar perfil';
                document.getElementById('erroAtualizacao').style.display = 'block';
                document.getElementById('avisoAtualizacao').style.display = 'none';
            }
        } catch (error) {
            console.error(error);
            document.getElementById('erroAtualizacao').textContent = 'Erro ao atualizar perfil';
            document.getElementById('erroAtualizacao').style.display = 'block';
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.textContent = 'Salvar Alterações';
        }
    });
}