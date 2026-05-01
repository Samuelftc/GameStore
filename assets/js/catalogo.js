let listaDeJogos = document.getElementById('listaDeJogos');

if (listaDeJogos) {

    function renderizarJogos(jogos) {
        listaDeJogos.innerHTML = '';

        jogos.forEach((jogo) => {
            const li = document.createElement('li');
            li.addEventListener('click', () => {
                window.location.href = `produto.php?tipo=jogo&id=${jogo.id}`;
            });

            const article = document.createElement('article');
            article.className = "cardJogo";

            const div = document.createElement('div');
            const foto = document.createElement('img');
            foto.src = jogo.foto;
            foto.alt = jogo.altFoto;
            div.append(foto);

            const nome = document.createElement('h4');
            nome.textContent = jogo.nome;

            const preco = document.createElement('p');
            preco.textContent = "R$" + jogo.preco.toFixed(2);

            article.append(div, nome, preco);
            li.append(article);
            listaDeJogos.append(li);
        });
    }

    // Renderiza todos os jogos no início
    renderizarJogos(Jogos);

    // FILTROS
    const checkboxes = document.querySelectorAll('.checkboxFiltro input');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', aplicarFiltros);
    });

    function aplicarFiltros() {
        const acaoChecked = document.getElementById('filtroAcao').checked;
        const RPGChecked = document.getElementById('filtroRPG').checked;
        const FPSChecked = document.getElementById('filtroFPS').checked;
        const aventuraChecked = document.getElementById('filtroAventura').checked;
        const PCChecked = document.getElementById('filtroPC').checked;
        const playStationChecked = document.getElementById('filtroPlayStation').checked;
        const xboxChecked = document.getElementById('filtroXbox').checked;

        const categoriasSelecionadas = [];
        if (acaoChecked) categoriasSelecionadas.push('Acao');
        if (RPGChecked) categoriasSelecionadas.push('RPG');
        if (FPSChecked) categoriasSelecionadas.push('FPS');
        if (aventuraChecked) categoriasSelecionadas.push('Aventura');

        const plataformasSelecionadas = [];
        if (PCChecked) plataformasSelecionadas.push('PC');
        if (playStationChecked) plataformasSelecionadas.push('PlayStation');
        if (xboxChecked) plataformasSelecionadas.push('Xbox');

        const filtrados = Jogos.filter(jogo => {
            const passaCategoria =
                categoriasSelecionadas.length === 0 ||
                jogo.categorias.some(cat => categoriasSelecionadas.includes(cat));

            const passaPlataforma =
                plataformasSelecionadas.length === 0 ||
                jogo.Plataformas.some(plat => plataformasSelecionadas.includes(plat));

            return passaCategoria && passaPlataforma;
        });

        renderizarJogos(filtrados);
    }
}