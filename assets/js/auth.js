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

// Lógica do cadastro
const usuarios = JSON.parse(localStorage.getItem("cadastros")) || [];
const submitCadastrar = document.getElementById("submitCadastrar");

function cadastrar() {
  const nome = document.getElementById("inputNomeCadastrar").value.trim();
  const email = document
    .getElementById("inputEmailCadastrar")
    .value.trim()
    .toLowerCase();
  const senha = document.getElementById("inputSenhaCadastrar").value;
  const confirmarSenha = document.getElementById(
    "inputConfirmarSenhaCadastrar",
  ).value;
  const termos = document.getElementById("termos").checked;

  if (nome === "" || email === "" || senha === "" || confirmarSenha === "") {
    chamarToastCadastro(`Por favor, preencha todos os campos!`);
    return;
  }

  if (!validarEmail(email)) {
    chamarToastCadastro(`Por favor, insira um e-mail válido!`);
    return;
  }

  if (!validarSenha(senha)) {
    chamarToastCadastro(
      `A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial.`,
    );
    return;
  }

  if (senha !== confirmarSenha) {
    chamarToastCadastro(`As senhas não coincidem!`);
    return;
  }

  if (usuarios.some((usuario) => usuario.email === email)) {
    chamarToastCadastro(`Este e-mail já está cadastrado!`);
    return;
  }

  if (!termos) {
    chamarToastCadastro(`Por favor, aceite os termos de uso!`);
    return;
  }

  const agora = new Date();
  const novoCadastro = {
    id: Date.now(),
    nome: nome,
    email: email,
    senha: senha,
    data: agora.toLocaleDateString("pt-BR"),
    criadoem: agora.getTime(),
  };

  usuarios.push(novoCadastro);
  localStorage.setItem("cadastros", JSON.stringify(usuarios));
  chamarToastCadastro(`Cadastro realizado com sucesso!`);
  document.getElementById("formCadastroJS").reset();
}

function validarSenha(senha) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  return regex.test(senha);
}

function validarEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

if (submitCadastrar) {
  submitCadastrar.addEventListener("click", (event) => {
    event.preventDefault();
    cadastrar();
    console.log(usuarios);
  });
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

// Lógica de login
const formLogin = document.getElementById("formLoginJS");

function login() {
  const usuarios = JSON.parse(localStorage.getItem("cadastros")) || [];

  const emailLogin = document
    .getElementById("inputEmailLogin")
    .value.trim()
    .toLowerCase();
  const senhaLogin = document.getElementById("inputSenhaLogin").value;

  if (emailLogin === "" || senhaLogin === "") {
    chamarToastCadastro(`Por favor, preencha os dois campos corretamente!`);
    return;
  }

  if (!validarEmail(emailLogin)) {
    chamarToastLogin(`Por favor, insira um e-mail válido!`);
    return;
  }

  const usuarioEncontrado = usuarios.find(
    (usuario) => usuario.email === emailLogin,
  );

  if (!usuarioEncontrado) {
    chamarToastLogin("Usuário não encontrado!");
    return;
  }

  if (usuarioEncontrado.senha !== senhaLogin) {
    chamarToastLogin("Senha incorreta!");
    return;
  }

  const usuarioLogado = {
    id: usuarioEncontrado.id,
    nome: usuarioEncontrado.nome,
    email: usuarioEncontrado.email,
    data: usuarioEncontrado.data,
  };

  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
  chamarToastLogin("Login realizado com sucesso!");

  window.location.href = "index.php";
}

if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
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
