const ultimoPedidoID = JSON.parse(localStorage.getItem('ultimoPedidoID'));
const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
const pedido = pedidos.find(p => p.id === ultimoPedidoID);
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

const containerConfirmacao = document.getElementById('containerConfirmacao');
const idPedido = document.getElementById('idPedido');
const nomeCliente = document.getElementById('nomeCliente');
const dataCompra = document.getElementById('dataCompra');
const statusCompra = document.getElementById('statusCompra');
const itensCompra = document.getElementById('itensCompra');
const totalCompra = document.getElementById('totalCompra');

function protecaoBase() {
    if (!usuarioLogado) {
        window.location.href = 'index.php'
        return;
    }

    if (!pedido) {
        window.location.href = 'index.php'
        return;
    }
}
protecaoBase()


// Renderizando
idPedido.textContent = pedido.id;
nomeCliente.textContent = pedido.nome;
dataCompra.textContent = pedido.data;
statusCompra.textContent = pedido.status;

pedido.itens.forEach(item => {
    const li = document.createElement('li');
    li.className = 'itemConfirmacao';

    const nome = document.createElement('span');
    nome.textContent = `${item.nome} (x${item.quantidade}) `;

    const subtotal = document.createElement('span');
    subtotal.textContent = ` R$ ${(item.preco * item.quantidade).toFixed(2)}`;

    li.append(nome, subtotal);
    itensCompra.appendChild(li);
});



totalCompra.textContent = `R$: ${pedido.total.toFixed(2)}`;

localStorage.removeItem('ultimoPedidoID');