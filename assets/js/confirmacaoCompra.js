const idPedidoEl = document.getElementById('idPedido');
const nomeCliente = document.getElementById('nomeCliente');
const dataCompra = document.getElementById('dataCompra');
const statusCompra = document.getElementById('statusCompra');
const itensCompra = document.getElementById('itensCompra');
const totalCompra = document.getElementById('totalCompra');

function pegarPedidoIdDaURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('pedido_id');
}

function formatarData(dataString) {
    const data = new Date(dataString.replace(' ', 'T'));
    return data.toLocaleDateString('pt-BR');
}

function formatarStatus(status) {
    return status.charAt(0).toUpperCase() + status.slice(1);
}

async function carregarPedido() {
    if (!usuarioLogado) {
        window.location.href = 'index.php';
        return;
    }

    const pedidoId = pegarPedidoIdDaURL();

    if (!pedidoId) {
        window.location.href = 'index.php';
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/API/pedidos/obter.php?pedido_id=${pedidoId}`);

        if (!response.ok) {
            throw new Error('Pedido não encontrado');
        }

        const data = await response.json();

        if (!data.sucesso) {
            throw new Error(data.mensagem || 'Pedido não encontrado');
        }

        renderizarPedido(data.pedido);
    } catch (error) {
        console.error(error);
        window.location.href = 'index.php';
    }
}

function renderizarPedido(pedido) {
    idPedidoEl.textContent = pedido.id;
    nomeCliente.textContent = usuarioLogado.nome;
    dataCompra.textContent = formatarData(pedido.criado_em);
    statusCompra.textContent = formatarStatus(pedido.status);

    itensCompra.innerHTML = '';

    pedido.itens.forEach(item => {
        const li = document.createElement('li');
        li.className = 'itemConfirmacao';

        const nome = document.createElement('span');
        nome.textContent = `${item.produto_nome} (x${item.quantidade}) `;

        const subtotal = document.createElement('span');
        subtotal.textContent = ` R$ ${(item.preco_unitario * item.quantidade).toFixed(2)}`;

        li.append(nome, subtotal);
        itensCompra.appendChild(li);
    });

    totalCompra.textContent = `R$ ${Number(pedido.total).toFixed(2)}`;
}

carregarPedido();
