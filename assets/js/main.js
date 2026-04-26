// Botao Checkout
const botaoLogin = document.getElementById("botaoLogin");
if (botaoLogin) {
  botaoLogin.addEventListener("click", () => {
    window.location.href = "auth.php";
  });
}

const btnSair = document.getElementById("btnSair");

function verificarSeEstaLogado() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  const botaoLogin = document.getElementById("botaoLogin");
  const liNomeUsuario = document.getElementById("liNomeUsuario");

  if (usuarioLogado) {
    if (liNomeUsuario) {
      liNomeUsuario.style.display = "flex";
      botaoLogin.style.display = "none";
      document.getElementById("nomeUsuario").textContent =
        usuarioLogado.nome.split(" ")[0];
    }
  }
}

verificarSeEstaLogado();
