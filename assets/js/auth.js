// Animações
const container = document.querySelector(".containerAuth");
const painelDireita = document.getElementById("painelDireita");
const painelEsquerda = document.getElementById("painelEsquerda");
const botaoCadastrar = document.getElementById("cadastrar");
const botaoEntrar = document.getElementById("entrar");

if (botaoCadastrar) {
  botaoCadastrar.addEventListener("click", () => {
    container.classList.add("cadastroAtivo");
    painelDireita.style.display = "none";
    painelEsquerda.style.display = "block";
  });
}

if (botaoEntrar) {
  botaoEntrar.addEventListener("click", () => {
    container.classList.remove("cadastroAtivo");
    painelDireita.style.display = "block";
    painelEsquerda.style.display = "none";
  });
}
// Fim das animações

// Fetch API cadastro
const formCadastro = document.getElementById("formCadastroJS");

if (formCadastro) {
  formCadastro.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formDataCadastro = new FormData(formCadastro);

    try {
      const response = await fetch(formCadastro.action, {
        method: "POST",
        body: formDataCadastro
      });

      let dadosCadastro;

      try {
        dadosCadastro = await response.json();
      } catch {
        throw new Error("Resposta Inválida do servidor");
      }

      if (dadosCadastro.sucesso && response.ok) {
        chamarToastCadastro(`${dadosCadastro.mensagem}`);

        formCadastro.reset();

        setTimeout(() => {
          location.reload();
        }, 1500);
      } else {
        chamarToastCadastro(`${dadosCadastro.mensagem || "Ocorreu um erro ao cadastrar. Por favor, tente novamente."}`);
      }

    } catch (error) {
      chamarToastCadastro("Erro ao enviar o formulário.");
    }
  })
}


function chamarToastCadastro(message) {
  const toast = document.createElement("div");
  toast.className = "toastCadastro";
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
// Fim da lógica de cadastro

// Fetch API login
const formLogin = document.getElementById("formLoginJS");

if (formLogin) {
  formLogin.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formDataLogin = new FormData(formLogin);

    try {
      const response = await fetch(formLogin.action, {
        method: "POST",
        body: formDataLogin
      });

      let dadosLogin;

      try {
        dadosLogin = await response.json();
      } catch {
        throw new Error("Resposta inválida do servidor");
      }

      if (dadosLogin.sucesso && response.ok) {
        chamarToastLogin(`${dadosLogin.mensagem}`);

        formLogin.reset();

        setTimeout(() => {
          window.location.href = `${BASE_URL}/public/index.php`
        }, 1500);
      } else {
        chamarToastLogin(`${dadosLogin.mensagem || "Ocorreu um erro ao cadastrar. Por favor, tente novamente."}`);
      }

    } catch (error) {
      chamarToastLogin("Erro ao enviar o formulário.");
    }

  });
}

function chamarToastLogin(message) {
  const toast = document.createElement("div");
  toast.className = "toastLogin";
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

document.querySelectorAll('.toggleSenha').forEach(icone => {
  icone.addEventListener('click', () => {
    const input = icone.previousElementSibling;
    const visivel = input.type === 'text';
    input.type = visivel ? 'password' : 'text';
    icone.classList.toggle('fa-eye', visivel);
    icone.classList.toggle('fa-eye-slash', !visivel);
  });
});

const irParaCadastro = document.getElementById('irParaCadastro');
const irParaLogin = document.getElementById('irParaLogin');

if (irParaCadastro) {
  irParaCadastro.addEventListener('click', () => {
    container.classList.add('cadastroAtivo');
  });
}

if (irParaLogin) {
  irParaLogin.addEventListener('click', () => {
    container.classList.remove('cadastroAtivo');
  });
}