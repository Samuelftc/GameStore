const informacoesCheckout = document.getElementById('informacoesCheckout');
const totalCheckout = document.getElementById('totalCheckout');
const btnPagar = document.getElementById('btnPagar');
const total = itensNoCarrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
// Array que vai conter os pedidos do usuario
const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

if (itensNoCarrinho.length === 0) {
    window.location.href = 'index.php';
}

function carregarInformacoesCheckout() {
    itensNoCarrinho.forEach((produto) => {
        const liCheckout = document.createElement('li');
        liCheckout.className = 'itemCheckout';

        const img = document.createElement('img');
        img.className = 'imagemCheckout';
        img.src = produto.foto;
        img.alt = produto.altfoto;

        const info = document.createElement('div');
        info.className = 'infoCheckout';

        const nome = document.createElement('h4');
        nome.className = 'nomeCheckout';
        nome.textContent = produto.nome;

        const preco = document.createElement('p');
        preco.className = 'precoCheckout';
        preco.textContent = `Subtotal:  R$ ${(produto.preco * produto.quantidade).toFixed(2)}`;

        info.append(nome, preco);

        const divQuantidade = document.createElement('div');
        divQuantidade.className = 'divQuantidadeCheckout';

        const quantidade = document.createElement('span');
        quantidade.className = 'quantidadeItemCheckout';
        quantidade.textContent = produto.quantidade;

        divQuantidade.appendChild(quantidade);

        liCheckout.append(img, info, divQuantidade);
        informacoesCheckout.appendChild(liCheckout);
    });

}
carregarInformacoesCheckout();

function mostrarTotalCheckout() {
    totalCheckout.textContent = total.toFixed(2);
}
mostrarTotalCheckout();

function BotaoPagar() {
    btnPagar.disabled = true;

    try {
        criarNovoPedido();
        alert('Compra realizada com sucesso!');
    } catch (erro) {
        btnPagar.disabled = false;
        alert('Erro ao processar pedido');
        return;
    }

    console.log('antes de zerar:', itensNoCarrinho);
    console.log('chave usada:', chaveCarrinho);

    itensNoCarrinho = [];
    salvarCarrinho();

    console.log('localStorage depois:', localStorage.getItem(chaveCarrinho));

    window.location.href = 'confirmacaoCompra.php';
}

function criarNovoPedido() {
    const agoraPedido = new Date();
    const novoPedido = {
        id: Date.now(),
        idUsuario: usuarioAtual.id,
        nome: usuarioAtual.nome,
        itens: [...itensNoCarrinho],
        total: total,
        status: "Confirmado",
        data: agoraPedido.toLocaleDateString('pt-BR'),
        criadoEm: agoraPedido.getTime()
    }

    pedidos.push(novoPedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    localStorage.setItem('ultimoPedidoID', JSON.stringify(novoPedido.id));
}

btnPagar.addEventListener('click', () => {
    if (!usuarioAtual) {
        alert("Faça login para finalizar a compra");
        return;
    }

    BotaoPagar();
});