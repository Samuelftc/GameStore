const formEditarPerfil = document.getElementById('formEditarPerfil');

if (formEditarPerfil) {
    formEditarPerfil.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = document.getElementById('inputNomePerfil').value.trim();
        const email = document.getElementById('inputEmailPerfil').value.trim();
        const btnSubmit = formEditarPerfil.querySelector('button[type="submit"]');

        // Validações básicas
        if (!nome || !email) {
            chamarToasts('Por favor, preencha todos os campos');
            return;
        }

        if (nome.length < 3) {
            chamarToasts('Nome deve ter no mínimo 3 caracteres');
            return;
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            chamarToasts('Email inválido');
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

            const divAviso = document.getElementById('avisoAtualizacao');
            const divErro = document.getElementById('erroAtualizacao');

            if (response.ok) {
                divAviso.textContent = data.mensagem;
                divAviso.style.display = 'block';
                divErro.style.display = 'none';

                setTimeout(() => {
                    location.reload();
                }, 1500);
            } else {
                divErro.textContent = data.mensagem || 'Erro ao atualizar perfil';
                divErro.style.display = 'block';
                divAviso.style.display = 'none';
            }
        } catch (error) {
            console.error(error);
            chamarToasts('Erro ao atualizar perfil');
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.textContent = 'Salvar Alterações';
        }
    });
}
