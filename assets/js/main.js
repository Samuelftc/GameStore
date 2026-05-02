// Botao Checkout
const botaoLogin = document.getElementById("botaoLogin");
if (botaoLogin) {
  botaoLogin.addEventListener("click", () => {
    window.location.href = "auth.php";
  });
}

const btnSair = document.getElementById("btnSair");

function verificarSeEstaLogado() {
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

const btnMenuMobile = document.getElementById('btnMenuMobile');
const navegacao = document.querySelector('.navegacao');

if (btnMenuMobile && navegacao) {

  function ajustarNavegacao() {
    if (window.innerWidth <= 662) {
      if (navegacao && navegacao.parentElement !== document.body) {
        document.body.appendChild(navegacao);
      }
    }
  }
  
  ajustarNavegacao();
  window.addEventListener('resize', ajustarNavegacao);
  
  const overlay = document.createElement('div');
  overlay.className = 'overlayMenu';
  document.body.appendChild(overlay);

  function fecharMenu() {
    navegacao.classList.remove('aberto');
    overlay.classList.remove('ativo');
  }

  btnMenuMobile.addEventListener('click', () => {
    navegacao.classList.toggle('aberto');
    overlay.classList.toggle('ativo');
  });

  // overlay.addEventListener('click', fecharMenu);

  navegacao.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') {
        return;
      }

      e.preventDefault();
      fecharMenu();
      window.location.href = href;
    });
  });
}