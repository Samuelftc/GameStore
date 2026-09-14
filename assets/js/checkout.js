const informacoesCheckout = document.getElementById('informacoesCheckout');
const totalCheckout = document.getElementById('totalCheckout');
const btnPagar = document.getElementById('btnPagar');

let itensCheckout = [];
let totalPedido = 0;

async function carregarCheckout() {
    try {
        const response = await fetch(`${BASE_URL}/API/carrinho/listar.php`);

        if (response.status === 401) {
            window.location.href = 'auth.php';
            return;
        }

        if (!response.ok) {
            throw new Error('Erro ao buscar carrinho');
        }

        const data = await response.json();
        itensCheckout = data.carrinho || [];

        if (itensCheckout.length === 0) {
            window.location.href = 'index.php';
            return;
        }

        renderizarCheckout();
    } catch (error) {
        console.error(error);
        window.location.href = 'index.php';
    }
}

function renderizarCheckout() {
    informacoesCheckout.innerHTML = '';

    itensCheckout.forEach((item) => {
        const liCheckout = document.createElement('li');
        liCheckout.className = 'itemCheckout';

        const img = document.createElement('img');
        img.className = 'imagemCheckout';
        img.src = `${BASE_URL}/assets/images/${item.foto}`;
        img.alt = item.alt_foto;

        const info = document.createElement('div');
        info.className = 'infoCheckout';

        const nome = document.createElement('h4');
        nome.className = 'nomeCheckout';
        nome.textContent = item.produto_nome;

        const preco = document.createElement('p');
        preco.className = 'precoCheckout';
        preco.textContent = `Subtotal:  R$ ${(item.produto_preco * item.quantidade).toFixed(2)}`;

        info.append(nome, preco);

        const divQuantidade = document.createElement('div');
        divQuantidade.className = 'divQuantidadeCheckout';

        const quantidade = document.createElement('span');
        quantidade.className = 'quantidadeItemCheckout';
        quantidade.textContent = item.quantidade;

        divQuantidade.appendChild(quantidade);

        liCheckout.append(img, info, divQuantidade);
        informacoesCheckout.appendChild(liCheckout);
    });

    totalPedido = itensCheckout.reduce((acc, item) => acc + item.produto_preco * item.quantidade, 0);
    totalCheckout.textContent = totalPedido.toFixed(2);
}

async function criarPedido() {
    const response = await fetch(`${BASE_URL}/API/pedidos/criar.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    let data;
    const text = await response.text();

    try {
        data = JSON.parse(text);
    } catch (e) {
        console.error('Resposta da API:', text);
        throw new Error('Resposta inválida do servidor');
    }

    if (!response.ok || !data.sucesso) {
        throw new Error(data.mensagem || 'Erro ao criar pedido');
    }

    return data.pedido_id;
}

btnPagar.addEventListener('click', async () => {
    if (!usuarioLogado) {
        alert('Faça login para finalizar a compra');
        return;
    }

    btnPagar.disabled = true;

    try {
        const pedidoId = await criarPedido();
        window.location.href = `confirmacaoCompra.php?pedido_id=${pedidoId}`;
    } catch (erro) {
        btnPagar.disabled = false;
        alert(erro.message || 'Erro ao processar pedido');
    }
});

carregarCheckout();
