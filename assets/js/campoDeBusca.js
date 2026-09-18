const inputBarraDePesquisa = document.getElementById("inputBarraDePesquisa");
const resultadosContainer = document.getElementById("resultadosPesquisa");

if (inputBarraDePesquisa) {
  inputBarraDePesquisa.addEventListener("input", async () => {
    const termo = inputBarraDePesquisa.value.trim();

    if (termo.length < 2) {
      resultadosContainer.innerHTML = "";
      resultadosContainer.style.display = "none";
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/API/produtos/buscar.php?termo=${encodeURIComponent(termo)}`);
      const data = await response.json();

      if (data.sucesso) {
        resultadosContainer.style.display = "block";
        exibirResultados(data.produtos);
      } else {
        resultadosContainer.innerHTML = "<p>Erro ao buscar produtos</p>";
      }
    } catch (error) {
      console.error('Erro na busca:', error);
      resultadosContainer.innerHTML = "<p>Erro ao buscar produtos</p>";
    }
  });
}

function exibirResultados(produtos) {
  resultadosContainer.innerHTML = "";

  if (!produtos || produtos.length === 0) {
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
    link.href = `${BASE_URL}/public/produto.php?id=${produto.id}`;

    const img = document.createElement("img");
    img.src = `${BASE_URL}/assets/images/${produto.foto}`;
    img.alt = produto.alt_foto || produto.nome;
    img.className = "imagemResultadoPesquisa";

    const infoDiv = document.createElement("div");
    infoDiv.style.cssText = "display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 0;";

    const nome = document.createElement("span");
    nome.textContent = produto.nome;
    nome.className = "nomeResultadoPesquisa";

    const preco = document.createElement("span");
    preco.textContent = `R$ ${parseFloat(produto.preco).toLocaleString('pt-BR')}`;
    preco.className = "precoResultadoPesquisa";

    infoDiv.append(nome, preco);
    link.append(img, infoDiv);
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
