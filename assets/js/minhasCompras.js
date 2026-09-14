const listaMinhasCompras = document.getElementById("listaMinhasCompras");
const semCompras = document.getElementById('semCompras');

function formatarData(dataString) {
    const data = new Date(dataString.replace(' ', 'T'));
    return data.toLocaleDateString('pt-BR');
}

async function carregarMinhasCompras() {
    if (!usuarioLogado) {
        window.location.href = 'index.php';
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/API/pedidos/listar.php`);

        if (!response.ok) {
            throw new Error('Erro ao buscar pedidos');
        }

        const data = await response.json();
        const pedidos = data.pedidos || [];

        if (pedidos.length === 0) {
            semCompras.textContent = "Sem compras realizadas";
        } else {
            pedidos.forEach(pedido => renderizarPedido(pedido));
        }
    } catch (error) {
        console.error(error);
        semCompras.textContent = "Erro ao carregar suas compras";
    }
}

function renderizarPedido(pedido) {
    const liMinhaCompra = document.createElement('li');
    liMinhaCompra.className = "liMinhaCompra";

    const idPedido = document.createElement('h3');
    idPedido.className = "idPedido";
    idPedido.textContent = `Pedido: #${pedido.id}`;

    const dataPedido = document.createElement('p');
    dataPedido.className = "dataPedido";
    dataPedido.textContent = `Data: ${formatarData(pedido.criado_em)}`;

    const totalPedido = document.createElement('p');
    totalPedido.className = "totalPedido";
    totalPedido.textContent = Number(pedido.total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const quantidadeItens = document.createElement('p');
    quantidadeItens.className = "quantidadeItens";
    quantidadeItens.textContent = `${pedido.itens.length} Item(s)`;

    const botaoSaibaMais = document.createElement('button');
    botaoSaibaMais.className = "botaoSaibaMais";
    botaoSaibaMais.textContent = "Ver Itens";

    const containerItens = document.createElement('div');
    containerItens.className = "containerItensPedido";

    pedido.itens.forEach(item => {
        const itemPedido = document.createElement('p');
        itemPedido.textContent = `${item.produto_nome} (x${item.quantidade}) - ` + Number(item.preco_unitario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        containerItens.appendChild(itemPedido);
    });

    botaoSaibaMais.addEventListener('click', () => {
        const aberto = containerItens.classList.contains('aberto');

        if (aberto) {
            containerItens.classList.remove('aberto');
            containerItens.style.maxHeight = null;
            botaoSaibaMais.textContent = "Ver Itens";
        } else {
            containerItens.classList.add('aberto');
            containerItens.style.maxHeight = containerItens.scrollHeight + "px";
            botaoSaibaMais.textContent = "Ocultar Itens";
        }
    });

    liMinhaCompra.append(idPedido, dataPedido, totalPedido, quantidadeItens, containerItens, botaoSaibaMais);
    listaMinhasCompras.appendChild(liMinhaCompra);
}

carregarMinhasCompras();
