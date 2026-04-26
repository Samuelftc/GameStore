const usuarioAtual = JSON.parse(localStorage.getItem('usuarioLogado'));
const chaveCarrinho = usuarioAtual ? `carrinho_${usuarioAtual.id}` : 'carrinho_guest';


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

// Estado do carrinho
let itensNoCarrinho = JSON.parse(localStorage.getItem(chaveCarrinho)) || [];

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

// Renderização do carrinho
function atualizarCarrinho() {
    listaCarrinho.innerHTML = '';

    // Carrinho vazio
    if (itensNoCarrinho.length === 0) {
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
    itensNoCarrinho.forEach((produto) => {
        const liCarrinho = document.createElement('li');
        liCarrinho.className = 'itemCarrinho';

        const img = document.createElement('img');
        img.className = 'imagem_carrinho';
        img.src = produto.foto;
        img.alt = produto.altfoto;

        const info = document.createElement('div');
        info.className = 'info_carrinho';

        const nome = document.createElement('h4');
        nome.className = 'nome_carrinho';
        nome.textContent = produto.nome;

        const preco = document.createElement('p');
        preco.className = 'preco_carrinho';
        preco.textContent = `R$ ${(produto.preco * produto.quantidade).toFixed(2)}`;

        info.append(nome, preco);

        const divQuantidade = document.createElement('div');
        divQuantidade.className = 'quantidade_carrinho';

        const diminuir = document.createElement('button');
        diminuir.className = 'diminuirQuantidade';
        diminuir.textContent = '-';

        diminuir.addEventListener('click', () => {
            if (produto.quantidade > 1) {
                produto.quantidade--;
                chamarToasts(`Quantidade de ${produto.nome} diminuída!`);
            } else {
                itensNoCarrinho = itensNoCarrinho.filter(
                    item => !(item.id === produto.id && item.tipo === produto.tipo)
                );
                chamarToasts(`${produto.nome} removido do carrinho!`);
            }

            salvarCarrinho();
            atualizarCarrinho();
        });

        const quantidade = document.createElement('span');
        quantidade.className = 'quantidadeItemCarrinho';
        quantidade.textContent = produto.quantidade;

        const aumentar = document.createElement('button');
        aumentar.className = 'aumentarQuantidade';
        aumentar.textContent = '+';

        aumentar.addEventListener('click', () => {
            produto.quantidade++;
            chamarToasts(`Quantidade de ${produto.nome} aumentada!`);
            salvarCarrinho();
            atualizarCarrinho();
        });

        divQuantidade.append(diminuir, quantidade, aumentar);

        liCarrinho.append(img, info, divQuantidade);
        listaCarrinho.appendChild(liCarrinho);
    });

    // Total
    const total = itensNoCarrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

    totalCarrinho.textContent = total.toFixed(2);
    calculaQuantidadeCarrinho();
    verificarBtnCompra();
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

function salvarCarrinho() {
    localStorage.setItem(chaveCarrinho, JSON.stringify(itensNoCarrinho));
}

if (listaCarrinho) {
    atualizarCarrinho();
}

// Animações de entrada e saida de carrinho