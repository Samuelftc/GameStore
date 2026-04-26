const inputBarraDePesquisa = document.getElementById("inputBarraDePesquisa");
const resultadosContainer = document.getElementById("resultadosPesquisa");

if (inputBarraDePesquisa) {
  inputBarraDePesquisa.addEventListener("input", () => {
    const filtrar = inputBarraDePesquisa.value.toLowerCase();

    if (filtrar.length < 2) {
      document.getElementById("resultadosPesquisa").innerHTML = "";
      resultadosContainer.style.display = "none";
      return;
    }

    resultadosContainer.style.display = "block";

    const produtosFiltrados = [...Jogos, ...Hardware].filter((p) =>
      p.nome.toLowerCase().includes(filtrar),
    );

    exibirResultados(produtosFiltrados);
  });
}

function exibirResultados(produtos) {
  resultadosContainer.innerHTML = "";
  if (produtos.length === 0) {
    const semResultados = document.createElement("p");
    semResultados.textContent = "Nenhum resultado encontrado.";
    resultadosContainer.appendChild(semResultados);
    return;
  }

  const listaResultados = document.createElement("ul");
  produtos.forEach((produto) => {
    const item = document.createElement("li");
    item.className = "itemResultadoPesquisa";

    const link = document.createElement("a");
    link.href = `produto.php?tipo=${produto.tipo}&id=${produto.id}`;

    const img = document.createElement("img");
    img.src = produto.foto;
    img.alt = produto.altFoto;
    img.className = "imagemResultadoPesquisa";

    const nome = document.createElement("span");
    nome.textContent = produto.nome;
    nome.className = "nomeResultadoPesquisa";

    link.append(img, nome);
    item.appendChild(link);
    listaResultados.appendChild(item);
  });

  resultadosContainer.appendChild(listaResultados);
}

document.addEventListener("click", (e) => {
  const container = document.getElementById("resultadosPesquisa");
  if (
    !inputBarraDePesquisa.contains(e.target) &&
    !container.contains(e.target)
  ) {
    container.innerHTML = "";
  }
});
