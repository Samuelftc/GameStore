const container = document.getElementById('produtoContainer');

async function buscarProduto(id) {
    try {
        const response = await fetch(`${BASE_URL}/API/produtos/produto.php?id=${id}`);

        if (!response.ok) {
            throw new Error('Erro ao buscar produto');
        }

        const data = await response.json();

        return data.produto;
    } catch (error) {
        console.error(error);
        return null;
    }
}

function renderizarProduto(produto) {
    if (!produto) {
        container.innerHTML = '<p>Produto não encontrado.</p>';
        return;
    }

    container.innerHTML = `
        <section class="informacoesProduto">
            <img 
                src="${BASE_URL}/assets/images/${produto.foto}" 
                alt="${produto.alt_foto}" 
                class="imagem_pagina"
            >

            <div class="info">
                <h1>${produto.nome}</h1>

                <p>${produto.descricao}</p>

                <p class="preco">
                    <strong>Preço:</strong> 
                    ${Number(produto.preco).toLocaleString(
        'pt-BR',
        {
            style: 'currency',
            currency: 'BRL'
        }
    )}
                </p>

                <button id="btnCarrinho">
                    Adicionar ao Carrinho
                </button>
            </div>
        </section>
    `;

    configurarCarrinho(produto);
}

function configurarCarrinho(produto) {
    const comprar = document.getElementById('btnCarrinho');

    if (!comprar) return;

    comprar.addEventListener('click', () => {

        const existingItem = itensNoCarrinho.find(item =>
            item.id === produto.id
        );

        if (existingItem) {

            existingItem.quantidade += 1;

            chamarToasts(
                `Quantidade de ${produto.nome} aumentada!`
            );

        } else {

            itensNoCarrinho.push({
                ...produto,
                quantidade: 1
            });

            chamarToasts(
                `${produto.nome} adicionado ao carrinho!`
            );
        }

        salvarCarrinho();
        atualizarCarrinho();
    });
}

async function carregarProduto() {

    if (!container) return;

    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get('id'));

    if (isNaN(id)) {
        container.innerHTML = '<p>Produto inválido.</p>';
        return;
    }

    const produto = await buscarProduto(id);

    renderizarProduto(produto);
}

carregarProduto();
