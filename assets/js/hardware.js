const listaDeHardware = document.getElementById('listaDeHardware');

if (listaDeHardware) {

    let hardware = [];

    // =========================
    // FETCH
    // =========================
    async function carregarHardware() {
        try {
            const response = await fetch(`${BASE_URL}/API/produtos/hardware.php`);

            if (!response.ok) {
                throw new Error('Erro ao buscar hardware');
            }

            const data = await response.json();

            hardware = data.hardware;

            renderizarHardware(hardware);

        } catch (error) {
            listaDeHardware.innerHTML = '<p>Erro ao carregar produtos. Tente novamente.</p>';
            console.error(error);
        }
    }

    // =========================
    // RENDER
    // =========================
    function renderizarHardware(produtos) {
        listaDeHardware.innerHTML = '';

        produtos.forEach(produto => {
            const li = document.createElement('li');

            const article = document.createElement('article');
            article.className = "cardJogo";

            article.addEventListener('click', () => {
                window.location.href = `produto.php?id=${produto.id}`;
            });

            const div = document.createElement('div');

            const img = document.createElement('img');
            img.src = `${BASE_URL}/assets/images/${produto.foto}`;
            img.alt = produto.alt_foto;

            div.append(img);

            const nome = document.createElement('h4');
            nome.textContent = produto.nome;

            const preco = document.createElement('p');
            preco.textContent = Number(produto.preco).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            article.append(div, nome, preco);
            li.append(article);
            listaDeHardware.append(li);
        });
    }

    // =========================
    // FILTROS
    // =========================
    const checkboxes = document.querySelectorAll('.checkboxFiltro input');

    checkboxes.forEach(cb => {
        cb.addEventListener('change', aplicarFiltros);
    });

    function aplicarFiltros() {
        if (hardware.length === 0) return;

        const tiposSelecionados = [];
        if (document.getElementById('filtroConsole').checked) tiposSelecionados.push('Console');
        if (document.getElementById('filtroPcCompleto').checked) tiposSelecionados.push('PC Completo');
        if (document.getElementById('filtroControles').checked) tiposSelecionados.push('Controles');
        if (document.getElementById('filtroPerifericos').checked) tiposSelecionados.push('Perifericos');
        if (document.getElementById('filtroComponentes').checked) tiposSelecionados.push('Componentes');

        const plataformasSelecionadas = [];
        if (document.getElementById('filtroPC').checked) plataformasSelecionadas.push('PC');
        if (document.getElementById('filtroPlayStation').checked) plataformasSelecionadas.push('PlayStation');
        if (document.getElementById('filtroXbox').checked) plataformasSelecionadas.push('Xbox');

        const filtrados = hardware.filter(produto => {
            const passaTipo =
                tiposSelecionados.length === 0 ||
                produto.categorias.some(t => tiposSelecionados.includes(t));

            const passaPlataforma =
                plataformasSelecionadas.length === 0 ||
                produto.plataformas.some(p => plataformasSelecionadas.includes(p));

            return passaTipo && passaPlataforma;
        });

        renderizarHardware(filtrados);
    }

    // INIT
    carregarHardware();
}