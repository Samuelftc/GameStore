const chaveCarrinho = usuarioLogado ? `carrinho_${usuarioLogado.id}` : 'carrinho_guest';

// Carrinho
const carrinho = document.getElementById('carrinho');
const listaCarrinho = document.getElementById('listaCarrinho');
const fecharCarrinho = document.getElementById('fecharCarrinho');
const abrirCarrinho = document.getElementById('botaoCarrinho');
const carrinhoHeader = document.getElementById('carrinhoHeader');
const totalCarrinho = document.getElementById('totalCarrinho');
const btnFinalizarCompra = document.getElementById('btnFinalizarCompra');

// Abrir e fechar carrinho
if (carrinho && abrirCarrinho && fecharCarrinho) {
    abrirCarrinho.addEventListener('click', () => {
        carrinho.classList.add('ativo');
    });

    fecharCarrinho.addEventListener('click', () => {
        carrinho.classList.remove('ativo');
    });
}

let itensNoCarrinho = [];

function verificarBtnCompra() {
    if (itensNoCarrinho.length > 0) {
        btnFinalizarCompra.style.opacity = '1';
        btnFinalizarCompra.style.pointerEvents = 'auto';
    } else {
        btnFinalizarCompra.style.opacity = '0.5';
        btnFinalizarCompra.style.pointerEvents = 'none';
    }
}

if (btnFinalizarCompra) {
    btnFinalizarCompra.addEventListener('click', () => {
        if (itensNoCarrinho.length > 0) {
            window.location.href = 'checkout.php';
        }
    });
}

async function pegarCarrinho() {

    try {
        const response = await fetch(`${BASE_URL}/API/carrinho/listar.php`);

        if (response.status === 401) {
            throw new Error('Faça login para acessar o carrinho');
        }

        if (!response.ok) {
            throw new Error('Erro ao buscar carrinho');
        }

        let data;

        try {
            data = await response.json();
        } catch {
            throw new Error('Resposta inválida da API');
        }

        return data.carrinho || [];

    } catch (error) {

        console.error(error);

        chamarToasts(error.message);

        return [];
    }
}

async function carregarCarrinho() {
    // Estado do carrinho
    itensNoCarrinho = await pegarCarrinho();

    if (listaCarrinho) {
        atualizarCarrinho(itensNoCarrinho);
        
    }
}

// Renderização do carrinho
function atualizarCarrinho(carrinho) {
    listaCarrinho.innerHTML = '';

    // Carrinho vazio
    if (carrinho.length === 0) {
        const vazio = document.createElement('p');
        vazio.className = 'carrinhoVazio';
        vazio.textContent = 'Carrinho vazio';
        listaCarrinho.appendChild(vazio);

        totalCarrinho.textContent = '0.00';
        verificarBtnCompra();
        calculaQuantidadeCarrinho();
        return;
    }

    // Itens
    carrinho.forEach(item => {
        renderizarItemCarrinho(item);
    });

    // Total
    const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

    totalCarrinho.textContent = total.toFixed(2);
    calculaQuantidadeCarrinho();
    verificarBtnCompra();
}

function renderizarItemCarrinho(item) {
    const liCarrinho = document.createElement('li');
    liCarrinho.className = 'itemCarrinho';

    const img = document.createElement('img');
    img.className = 'imagem_carrinho';
    img.src = `${BASE_URL}/assets/images/${item.foto}`;
    img.alt = item.alt_foto;

    const info = document.createElement('div');
    info.className = 'info_carrinho';

    const nome = document.createElement('h4');
    nome.className = 'nome_carrinho';
    nome.textContent = item.produto_nome;

    const preco = document.createElement('p');
    preco.className = 'preco_carrinho';
    preco.textContent = `R$ ${(item.produto_preco * item.quantidade).toFixed(2)}`;

    info.append(nome, preco);

    const divQuantidade = document.createElement('div');
    divQuantidade.className = 'quantidade_carrinho';

    const diminuir = document.createElement('button');
    diminuir.className = 'diminuirQuantidade';
    diminuir.textContent = '-';

    diminuir.addEventListener('click', () => {
        if (item.quantidade > 1) {
            item.quantidade--;
            chamarToasts(`Quantidade de ${item.produto_nome} diminuída!`);
        } else {
            itensNoCarrinho = itensNoCarrinho.filter(
                carrinhoItem => !(carrinhoItem.id === item.id && carrinhoItem.tipo === item.tipo)
            );
            chamarToasts(`${item.produto_nome} removido do carrinho!`);
        }

        atualizarCarrinho(itensNoCarrinho);
    });

    const quantidade = document.createElement('span');
    quantidade.className = 'quantidadeItemCarrinho';
    quantidade.textContent = item.quantidade;

    const aumentar = document.createElement('button');
    aumentar.className = 'aumentarQuantidade';
    aumentar.textContent = '+';

    aumentar.addEventListener('click', () => {
        item.quantidade++;
        chamarToasts(`Quantidade de ${item.produto_nome} aumentada!`);
        atualizarCarrinho(itensNoCarrinho);
    });

    divQuantidade.append(diminuir, quantidade, aumentar);

    liCarrinho.append(img, info, divQuantidade);
    listaCarrinho.appendChild(liCarrinho);
}

// Badge do carrinho
function calculaQuantidadeCarrinho() {
    const totalItens = itensNoCarrinho.reduce(
        (acc, item) => acc + item.quantidade,
        0
    );

    if (!carrinhoHeader) return;

    const badgeExistente = carrinhoHeader.querySelector('.iconeCarrinho');

    if (totalItens > 0) {
        if (badgeExistente) {
            badgeExistente.textContent = totalItens;
        } else {
            const badge = document.createElement('span');
            badge.className = 'iconeCarrinho';
            badge.textContent = totalItens;
            carrinhoHeader.appendChild(badge);
        }
    } else {
        if (badgeExistente) {
            badgeExistente.remove();
        }
    }
}

function chamarToasts(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

carregarCarrinho();