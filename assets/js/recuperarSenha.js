// Formulário - Esqueceu Senha
const formEsqueceuSenha = document.getElementById('formEsqueceuSenha');
if (formEsqueceuSenha) {
    formEsqueceuSenha.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('inputEmailRecuperacao').value.trim();
        const btnSubmit = formEsqueceuSenha.querySelector('button[type="submit"]');

        if (!email) {
            chamarToasts('Por favor, preencha o email');
            return;
        }

        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Enviando...';

        try {
            const response = await fetch(`${BASE_URL}/API/auth/solicitarResetSenha.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    email: email
                })
            });

            const data = await response.json();

            if (response.ok) {
                chamarToasts('Email enviado com sucesso! Verifique sua caixa de entrada', 'sucesso');
                setTimeout(() => {
                    window.location.href = `${BASE_URL}/public/auth.php`;
                }, 2000);
            } else {
                chamarToasts(data.mensagem || 'Erro ao enviar email');
            }
        } catch (error) {
            console.error(error);
            chamarToasts('Erro ao enviar email');
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.textContent = 'Enviar Link de Recuperação';
        }
    });
}

// Formulário - Reset Senha
const formResetSenha = document.getElementById('formResetSenha');
if (formResetSenha) {
    formResetSenha.addEventListener('submit', async (e) => {
        e.preventDefault();

        const senha = document.getElementById('inputNovaSenha').value;
        const confirmar = document.getElementById('inputConfirmarSenha').value;
        const token = formResetSenha.querySelector('input[name="token"]').value;
        const btnSubmit = formResetSenha.querySelector('button[type="submit"]');

        // Validação
        if (!senha || !confirmar) {
            chamarToasts('Preencha todos os campos');
            return;
        }

        if (senha !== confirmar) {
            chamarToasts('As senhas não coincidem');
            return;
        }

        const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!regexSenha.test(senha)) {
            chamarToasts('Senha fraca. Mínimo 8 caracteres, maiúscula, minúscula, número e símbolo');
            return;
        }

        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Redefinindo...';

        try {
            const response = await fetch(`${BASE_URL}/API/auth/recuperar-senha.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    token: token,
                    senha: senha,
                    confirmar: confirmar
                })
            });

            if (response.redirected) {
                window.location.href = response.url;
            } else {
                const text = await response.text();
                console.error('Resposta:', text);
                chamarToasts('Erro ao redefinir senha');
            }
        } catch (error) {
            console.error(error);
            chamarToasts('Erro ao redefinir senha');
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.textContent = 'Redefinir Senha';
        }
    });
}

// Toggle visibilidade de senha
document.querySelectorAll('.toggleSenha').forEach(icon => {
    icon.addEventListener('click', (e) => {
        const input = e.target.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
            e.target.classList.remove('fa-regular');
            e.target.classList.add('fa-solid');
        } else {
            input.type = 'password';
            e.target.classList.add('fa-regular');
            e.target.classList.remove('fa-solid');
        }
    });
});
