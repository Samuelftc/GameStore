let listaDeJogos = document.getElementById('listaDeJogos');

if (listaDeJogos) {

    let Jogos = [];

    try {
        const response = await fetch(`${BASE_URL}/API/produtos/jogos.php`);

        if (!response.ok) {
            throw new Error('Erro ao buscar jogos');
        }

        const data = await response.json();

        Jogos = data.jogos;

        renderizarJogos(Jogos);
        
    } catch (error) {
        listaDeJogos.innerHTML = '<p>Erro ao carregar jogos. Por favor, tente novamente mais tarde.</p>';
    }


    function renderizarJogos(jogos) {
        listaDeJogos.innerHTML = '';

        jogos.forEach((jogo) => {
            const li = document.createElement('li');
            li.addEventListener('click', () => {
                window.location.href = `produto.php?id=${jogo.id}`;
            });

            const article = document.createElement('article');
            article.className = "cardJogo";

            const div = document.createElement('div');
            const foto = document.createElement('img');
            foto.src = `${BASE_URL}/assets/images/${jogo.foto}`;
            foto.alt = jogo.alt_foto;
            div.append(foto);

            const nome = document.createElement('h4');
            nome.textContent = jogo.nome;

            const preco = document.createElement('p');
            preco.textContent = Number(jogo.preco).toLocaleString(
                'pt-BR',
                {
                    style: 'currency',
                    currency: 'BRL'
                }
            );

            article.append(div, nome, preco);
            li.append(article);
            listaDeJogos.append(li);
        });
    }

    // FILTROS
    const checkboxes = document.querySelectorAll('.checkboxFiltro input');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', aplicarFiltros);
    });

    function aplicarFiltros() {
        if (Jogos.length === 0) return;

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