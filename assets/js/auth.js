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
const inputNomeCadastrar = document.getElementById("inputNomeCadastrar");
const inputEmailCadastrar = document.getElementById("inputEmailCadastrar");
const inputSenhaCadastrar = document.getElementById("inputSenhaCadastrar");
const inputConfirmarSenhaCadastrar = document.getElementById("inputConfirmarSenhaCadastrar");
const inputTermos = document.getElementById("termos");

if (formCadastro) {
  formCadastro.addEventListener("submit", async function (e) {
    e.preventDefault();

    const dadosCadastro = {
      nome: inputNomeCadastrar.value,
      email: inputEmailCadastrar.value,
      senha: inputSenhaCadastrar.value,
      confirmarSenha: inputConfirmarSenhaCadastrar.value,
      termos: inputTermos.value
    }

    try {
      const response = await fetch(formCadastro.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosCadastro)
      });

      let resposta;

      try {
        resposta = await response.json();
      } catch {
        throw new Error("Resposta Inválida do servidor");
      }

      if (resposta.sucesso && response.ok) {
        chamarToastCadastro(`${resposta.mensagem}`, true);

        formCadastro.reset();

        setTimeout(() => {
          location.reload();
        }, 1500);
      } else {
        chamarToastCadastro(`${resposta.mensagem || "Ocorreu um erro ao cadastrar. Por favor, tente novamente."}`, false);
      }

    } catch (error) {
      chamarToastCadastro("Erro ao enviar o formulário.", false);
    }
  })
}


function chamarToastCadastro(message, sucesso = false) {
  const toast = document.createElement("div");
  toast.className = `toastCadastro ${sucesso ? 'toast-sucesso' : 'toast-erro'}`;

  const icon = document.createElement("i");
  icon.className = sucesso ? "fa-solid fa-check-circle" : "fa-solid fa-exclamation-circle";

  const texto = document.createElement("span");
  texto.textContent = message;

  toast.appendChild(icon);
  toast.appendChild(texto);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-saindo");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}
// Fim da lógica de cadastro

// Fetch API login
const formLogin = document.getElementById("formLoginJS");
const inputEmailLogin = document.getElementById("inputEmailLogin");
const inputSenhaLogin = document.getElementById("inputSenhaLogin");

if (formLogin) {
  formLogin.addEventListener("submit", async function (e) {
    e.preventDefault();

    const dadosLogin = {
      email: inputEmailLogin.value,
      senha: inputSenhaLogin.value
    }

    try {
      const response = await fetch(formLogin.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosLogin)
      });

      let resposta;

      try {
        resposta = await response.json();
      } catch {
        throw new Error("Resposta inválida do servidor");
      }

      if (resposta.sucesso && response.ok) {
        chamarToastLogin(`${resposta.mensagem}`, true);

        formLogin.reset();

        setTimeout(() => {
          window.location.href = `${BASE_URL}/public/index.php`
        }, 1500);
      } else {
        chamarToastLogin(`${resposta.mensagem || "Ocorreu um erro ao cadastrar. Por favor, tente novamente."}`, false);
      }

    } catch (error) {
      chamarToastLogin("Erro ao enviar o formulário.", false);
    }

  });
}

function chamarToastLogin(message, sucesso = false) {
  const toast = document.createElement("div");
  toast.className = `toastLogin ${sucesso ? 'toast-sucesso' : 'toast-erro'}`;

  const icon = document.createElement("i");
  icon.className = sucesso ? "fa-solid fa-check-circle" : "fa-solid fa-exclamation-circle";

  const texto = document.createElement("span");
  texto.textContent = message;

  toast.appendChild(icon);
  toast.appendChild(texto);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-saindo");
    setTimeout(() => {
      toast.remove();
    }, 300);
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