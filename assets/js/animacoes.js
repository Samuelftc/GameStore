const slides = document.querySelectorAll(".bannerSlide");
let slideAtual = 0;

function trocarSlide() {
  const slideAtualElemento = slides[slideAtual];

  // define próximo índice
  let proximo = slideAtual + 1;
  if (proximo >= slides.length) {
    proximo = 0;
  }

  const proximoSlide = slides[proximo];

  // prepara próximo para entrar
  proximoSlide.classList.add("ativo");

  // faz o atual sair
  slideAtualElemento.classList.add("saindo");
  slideAtualElemento.classList.remove("ativo");

  // limpa classe depois da animação
  setTimeout(() => {
    slideAtualElemento.classList.remove("saindo");
  }, 800);

  slideAtual = proximo;
}

if (slides.length > 0) {
  slides[0].classList.add("ativo"); // inicia primeiro
  setInterval(trocarSlide, 3000);
}

let tituloAnimado = document.querySelector("#banner h1");
if (tituloAnimado) {
  let tituloAnimado2 = tituloAnimado.textContent;
  tituloAnimado.textContent = "";

  tituloAnimado2.split("").forEach((letra, index) => {
    setTimeout(() => {
      tituloAnimado.textContent += letra;
    }, 100 * index);
  });
}