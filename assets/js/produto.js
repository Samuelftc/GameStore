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

    comprar.addEventListener('click', async () => {

        comprar.disabled = true;
        await adicionarNoCarrinho(produto.id);
        comprar.disabled = false;

    });
}

async function adicionarNoCarrinho(produtoId) {

    try {

        const response = await fetch(
            `${BASE_URL}/API/carrinho/adicionar.php`,
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    produto_id: produtoId,
                    quantidade: 1
                })
            }
        );

        let data;

        try {
            data = await response.json();
        } catch {
            throw new Error('Resposta inválida da API');
        }

        if (response.status === 401) {
            chamarToasts('Faça login para adicionar ao carrinho');
            return;
        }

        if (!response.ok) {
            throw new Error(data.mensagem);
        }

        chamarToasts(data.mensagem);

    } catch (error) {

        console.error(error);

        chamarToasts('Erro ao adicionar ao carrinho');
    }
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
