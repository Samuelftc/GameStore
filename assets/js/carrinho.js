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
            return [];
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
    const total = carrinho.reduce((acc, item) => acc + item.produto_preco * item.quantidade, 0);

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

    diminuir.addEventListener('click', async () => {
        try {
            if (item.quantidade > 1) {
                // Atualizar quantidade pra quantidade - 1
                const response = await fetch(`${BASE_URL}/API/carrinho/atualizar.php`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        produto_id: item.produto_id,
                        quantidade: item.quantidade - 1
                    })
                });
                if (!response.ok) throw new Error('Erro ao atualizar');
                item.quantidade--;
                chamarToasts(`Quantidade de ${item.produto_nome} diminuída!`, 'sucesso');
            } else {
                // Remover item (quantidade = 0)
                const response = await fetch(`${BASE_URL}/API/carrinho/remover.php`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ produto_id: item.produto_id })
                });
                if (!response.ok) throw new Error('Erro ao remover');
                itensNoCarrinho = itensNoCarrinho.filter(
                    carrinhoItem => carrinhoItem.id !== item.id
                );
                chamarToasts(`${item.produto_nome} removido do carrinho!`, 'sucesso');
            }


            const responseCarrinho = await fetch(`${BASE_URL}/API/carrinho/listar.php`);
            if (!responseCarrinho.ok) throw new Error('Erro ao buscar carrinho');
            const data = await responseCarrinho.json();
            itensNoCarrinho = data.carrinho || [];

            atualizarCarrinho(itensNoCarrinho);
        } catch (error) {
            chamarToasts('Erro ao atualizar carrinho');
        }
    });


    const quantidade = document.createElement('span');
    quantidade.className = 'quantidadeItemCarrinho';
    quantidade.textContent = item.quantidade;

    const aumentar = document.createElement('button');
    aumentar.className = 'aumentarQuantidade';
    aumentar.textContent = '+';

    aumentar.addEventListener('click', async () => {
        try {
            // Faz o fetch PRIMEIRO
            const response = await fetch(`${BASE_URL}/API/carrinho/atualizar.php`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    produto_id: item.produto_id,
                    quantidade: item.quantidade + 1
                })
            });

            if (!response.ok) throw new Error('Erro ao atualizar');

            // SÓ DEPOIS altera e re-renderiza
            item.quantidade++;
            const responseCarrinho = await fetch(`${BASE_URL}/API/carrinho/listar.php`);
            if (!responseCarrinho.ok) throw new Error('Erro ao buscar carrinho');
            const data = await responseCarrinho.json();
            itensNoCarrinho = data.carrinho || [];

            atualizarCarrinho(itensNoCarrinho);
            chamarToasts(`Quantidade de ${item.produto_nome} aumentada!`, 'sucesso');
        } catch (error) {
            chamarToasts('Erro ao atualizar carrinho');
        }
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

function chamarToasts(message, tipo = 'erro') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;

    const icon = document.createElement('i');
    icon.className = tipo === 'sucesso' ? 'fa-solid fa-check-circle' : 'fa-solid fa-exclamation-circle';

    const texto = document.createElement('span');
    texto.textContent = message;

    toast.appendChild(icon);
    toast.appendChild(texto);
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-saindo');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

carregarCarrinho();