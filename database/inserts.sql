USE gamestore;

-- CATEGORIAS
INSERT INTO
    categorias (nome)
VALUES
    ('Acao'),
    ('RPG'),
    ('Aventura'),
    ('FPS'),
    ('Corrida'),
    ('Simulacao'),
    ('Terror'),
    ('Esporte'),
    ('Competitivo'),
    ('Tatico'),
    ('Console'),
    ('PC Completo'),
    ('Controles'),
    ('Perifericos'),
    ('Componentes');

-- PLATAFORMAS
INSERT INTO
    plataformas (nome)
VALUES
    ('PC'),
    ('PlayStation'),
    ('Xbox');

-- PRODUTOS — JOGOS
INSERT INTO
    produtos (nome, descricao, preco, foto, alt_foto, tipo)
VALUES
    (
        'Cyberpunk 2077',
        'Cyberpunk 2077 é um RPG de ação em mundo aberto ambientado em Night City, uma metrópole futurista obcecada por poder, glamour e modificações corporais. Você assume o papel de V, um mercenário em busca de um implante único que garante a imortalidade. O jogo oferece narrativa profunda, escolhas que impactam a história e um mundo vivo e detalhado.',
        149.00,
        'capaDoJogoCyberpunk.png',
        'Capa do jogo Cyberpunk',
        'jogo'
    ),
    (
        'The Last Of Us Part II',
        'The Last of Us Part II é uma experiência intensa e emocional que acompanha Ellie em uma jornada brutal de vingança e sobrevivência em um mundo pós-apocalíptico. Com narrativa madura, gráficos impressionantes e jogabilidade refinada, o jogo explora temas como ódio, perda e redenção.',
        150.00,
        'capaDoJogoTheLastOfUs2.png',
        'Capa do jogo The Last Of Us 2',
        'jogo'
    ),
    (
        'God of War Ragnarök',
        'God of War Ragnarök dá continuidade à saga de Kratos e Atreus na mitologia nórdica. Enfrente deuses poderosos, explore reinos incríveis e vivencie uma história épica sobre destino, paternidade e sacrifício. Combate visceral e narrativa cinematográfica elevam a experiência.',
        200.00,
        'capaDoJogoGodOfWarRagnarok.jpg',
        'Capa do jogo God Of War Ragnarok',
        'jogo'
    ),
    (
        'The Witcher 3: Wild Hunt',
        'The Witcher 3 é um RPG de mundo aberto aclamado pela crítica, colocando você no papel de Geralt de Rívia, um caçador de monstros profissional. Com missões profundas, escolhas morais complexas e um vasto mundo para explorar, é considerado um dos melhores RPGs já feitos.',
        120.00,
        'capaDoJogoTheWitcher3.png',
        'Capa do jogo The Witcher 3',
        'jogo'
    ),
    (
        'Horizon Forbidden West',
        'Horizon Forbidden West acompanha Aloy em uma nova aventura por terras perigosas e misteriosas. Enfrente máquinas colossais, descubra segredos de civilizações antigas e salve o planeta de uma ameaça iminente em um mundo aberto visualmente deslumbrante.',
        180.00,
        'capaDoJogoHorizonForbiddenWest.jpg',
        'Capa do jogo Horizon Forbidden West',
        'jogo'
    ),
    (
        'Elden Ring',
        'Elden Ring é um RPG de ação em mundo aberto criado por Hidetaka Miyazaki em colaboração com George R. R. Martin. Explore as Terras Intermédias, enfrente inimigos desafiadores e construa seu próprio caminho em um jogo conhecido por sua liberdade e dificuldade recompensadora.',
        220.00,
        'capaDoJogoEldenRing.jpg',
        'Capa do jogo Elden Ring',
        'jogo'
    ),
    (
        'Forza Horizon 5',
        'Forza Horizon 5 é um jogo de corrida em mundo aberto ambientado no México. Com gráficos realistas, centenas de carros licenciados e eventos dinâmicos, oferece uma experiência de corrida acessível e extremamente divertida para todos os tipos de jogadores.',
        180.00,
        'capaDoJogoForzaHorizon5.avif',
        'Capa do jogo Forza Horizon 5',
        'jogo'
    ),
    (
        'Resident Evil Village',
        'Resident Evil Village combina terror e ação em uma narrativa sombria e envolvente. Acompanhe Ethan Winters em uma vila isolada cheia de criaturas aterrorizantes, mistérios macabros e personagens memoráveis.',
        160.00,
        'capaDoJogoResidentEvilVillage.png',
        'Capa do jogo Resident Evil Village',
        'jogo'
    ),
    (
        'Ghost of Tsushima',
        'Ghost of Tsushima é uma aventura de ação ambientada no Japão feudal durante a invasão mongol. Explore paisagens belíssimas, domine o combate com espadas e torne-se o lendário Fantasma para salvar sua terra natal.',
        140.00,
        'capaDoJogoGhostOfTsushima.png',
        'Capa do jogo Ghost of Tsushima',
        'jogo'
    ),
    (
        'FIFA 26',
        'FIFA 26 traz a experiência definitiva do futebol, com gráficos realistas, modos de jogo aprimorados e licenças oficiais de clubes e seleções. Ideal para jogar sozinho ou competir online com amigos.',
        250.00,
        'capaDoJogoFifa26.avif',
        'Capa do jogo FIFA 26',
        'jogo'
    ),
    (
        'Kingdom Come Deliverance II',
        'Kingdom Come Deliverance II é um RPG de ação realista ambientado na Boêmia medieval. O jogo foca em narrativa profunda, decisões morais, combate baseado em física e um mundo historicamente fiel, oferecendo uma experiência imersiva e desafiadora.',
        210.00,
        'capaDoJogoKingdomComeDeliverance2.jpg',
        'Capa do jogo Kingdom Come Deliverance II',
        'jogo'
    ),
    (
        'Clair Obscur: Expedition 33',
        'Clair Obscur: Expedition 33 é um RPG estilizado com combate por turnos dinâmico e narrativa artística. Ambientado em um mundo surreal, o jogo mistura ação, estratégia e uma estética única inspirada em pintura e fantasia sombria.',
        160.00,
        'capaDoJogoClairObscurExpedition33.png',
        'Capa do jogo Clair Obscur Expedition 33',
        'jogo'
    ),
    (
        'Call of Duty: Modern Warfare 3',
        'Call of Duty: Modern Warfare 3 entrega ação intensa com campanha cinematográfica, modos multiplayer competitivos e cooperativo. O jogo traz armas modernas, mapas icônicos e ritmo acelerado característico da franquia.',
        230.00,
        'capaDoJogoCallOfDutyMW3.webp',
        'Capa do jogo Call of Duty Modern Warfare 3',
        'jogo'
    ),
    (
        'Counter-Strike 2',
        'Counter-Strike 2 é a evolução do clássico FPS competitivo. Com gráficos atualizados, mecânicas refinadas e foco total em habilidade e estratégia em equipe, o jogo mantém sua essência tática que o tornou referência nos eSports.',
        0.00,
        'capaDoJogoCounterStrike2.jpg',
        'Capa do jogo Counter-Strike 2',
        'jogo'
    ),
    (
        'Battlefield 2042',
        'Battlefield 2042 é um FPS em larga escala focado em combates massivos com até dezenas de jogadores. O jogo apresenta mapas gigantes, veículos militares, destruição dinâmica e cenários futuristas.',
        180.00,
        'capaDoJogoBattlefield2042.jpg',
        'Capa do jogo Battlefield 2042',
        'jogo'
    ),
    (
        'Valorant',
        'Valorant é um FPS tático competitivo que combina precisão de tiro com habilidades únicas de agentes. Estratégia, trabalho em equipe e reflexos rápidos são essenciais para vencer partidas intensas e ranqueadas.',
        0.00,
        'capaDoJogoValorant.jpg',
        'Capa do jogo Valorant',
        'jogo'
    ),
    (
        'DOOM Eternal',
        'DOOM Eternal é um FPS frenético que coloca o jogador contra hordas de demônios em combates rápidos e brutais. Com trilha sonora pesada, movimentação ágil e arsenal poderoso, o jogo recompensa agressividade e habilidade.',
        120.00,
        'capaDoJogoDoomEternal.png',
        'Capa do jogo DOOM Eternal',
        'jogo'
    ),
    -- PRODUTOS — HARDWARE
    (
        'PlayStation 5',
        'O PlayStation 5 representa a nova geração de consoles da Sony, oferecendo gráficos em até 4K com suporte a ray tracing, carregamentos ultrarrápidos graças ao SSD de alta velocidade e uma experiência imersiva com o controle DualSense.',
        3999.90,
        'ps5.jpg',
        'Console PlayStation 5',
        'hardware'
    ),
    (
        'Xbox Series X',
        'O Xbox Series X é o console mais potente da Microsoft, projetado para rodar jogos em 4K nativo a até 120 FPS. Equipado com SSD NVMe de 1TB, 16GB de RAM GDDR6 e arquitetura AMD RDNA 2, oferece carregamentos rápidos, função Quick Resume e ampla retrocompatibilidade com gerações anteriores.',
        3799.90,
        'xboxSeriesX.jpg',
        'Console Xbox Series X',
        'hardware'
    ),
    (
        'PC Gamer Ryzen 7',
        'PC Gamer completo equipado com processador Ryzen 7, ideal para rodar jogos atuais em alta qualidade, além de excelente desempenho em multitarefa, edição de vídeo e aplicações pesadas.',
        6499.90,
        'pcGamerRyzen7.webp',
        'PC Gamer Completo',
        'hardware'
    ),
    (
        'Controle DualSense',
        'O controle DualSense do PlayStation 5 traz uma nova experiência de jogabilidade com resposta tátil avançada e gatilhos adaptáveis. Seu design ergonômico e tecnologia de vibração inteligente aumentam a imersão em cada jogo.',
        449.90,
        'controleDualSense.webp',
        'Controle DualSense',
        'hardware'
    ),
    (
        'Teclado Mecânico RGB',
        'Teclado mecânico gamer com iluminação RGB personalizável, switches de alta durabilidade e resposta rápida. Ideal para jogadores competitivos e usuários que valorizam conforto, precisão e visual moderno.',
        299.90,
        'tecladoMecanicoRGB.webp',
        'Teclado Gamer Mecânico',
        'hardware'
    ),
    (
        'RTX 4070',
        'A placa de vídeo NVIDIA RTX 4070 oferece alto desempenho gráfico com suporte a ray tracing e tecnologia DLSS. Ideal para jogos em alta resolução, criação de conteúdo e experiências visuais de última geração.',
        4599.90,
        'placaDeVideoRTX4070.webp',
        'Placa de Vídeo RTX',
        'hardware'
    ),
    (
        'Xbox Series S',
        'O Xbox Series S é um console compacto e totalmente digital, focado em desempenho e custo-benefício. Conta com SSD rápido, suporte a até 120 FPS e acesso ao vasto catálogo do Xbox Game Pass.',
        2499.90,
        'xboxSeriesS.jpg',
        'Console Xbox Series S',
        'hardware'
    ),
    (
        'PlayStation 4',
        'O PlayStation 4 é um console consagrado, com uma enorme biblioteca de jogos e desempenho sólido. Ideal para quem deseja entrar no ecossistema PlayStation com ótimo custo-benefício.',
        2299.90,
        'ps4.webp',
        'Console PlayStation 4',
        'hardware'
    ),
    (
        'Notebook Gamer i7 RTX 3060',
        'Notebook gamer equipado com processador Intel i7 e placa de vídeo dedicada, ideal para rodar jogos modernos, trabalhar com softwares pesados e manter alta performance em mobilidade.',
        7999.90,
        'notebookGamerI7RTX4060.webp',
        'Notebook Gamer',
        'hardware'
    ),
    (
        'Monitor Gamer AOC 27\'\' 144Hz',
        'Monitor gamer de 27 polegadas com taxa de atualização de 144Hz, proporcionando imagens mais fluidas e vantagem competitiva em jogos de ação e FPS.',
        1399.90,
        'monitorGamerAOC.webp',
        'Monitor Gamer',
        'hardware'
    ),
    (
        'Mouse Gamer RGB',
        'Mouse gamer com sensor de alta precisão, iluminação RGB e design ergonômico. Ideal para jogadores que buscam controle, velocidade e conforto.',
        199.90,
        'mouseGamer.webp',
        'Mouse Gamer',
        'hardware'
    ),
    (
        'Headset Gamer Surround',
        'Headset gamer com áudio surround, proporcionando maior imersão sonora. Conta com microfone de qualidade e conforto para longas sessões de jogo.',
        349.90,
        'headsetGamerSurrond.jpg',
        'Headset Gamer',
        'hardware'
    ),
    (
        'Controle Xbox Series',
        'Controle oficial do Xbox Series com ergonomia aprimorada, resposta precisa dos botões e compatibilidade com consoles Xbox e PC.',
        429.90,
        'controleXboxSeries.webp',
        'Controle Xbox',
        'hardware'
    ),
    (
        'SSD NVMe 1TB Kingston',
        'SSD NVMe de 1TB com altíssima velocidade de leitura e gravação, ideal para reduzir drasticamente tempos de carregamento e melhorar o desempenho geral do sistema.',
        1199.90,
        'ssd1TBKingston.webp',
        'SSD 1TB',
        'hardware'
    ),
    (
        'Memória RAM 16GB DDR4',
        'Memória RAM DDR4 de 16GB, ideal para jogos modernos, multitarefa avançada e maior estabilidade do sistema.',
        1259.90,
        'memoriaRam16gb.webp',
        'Memória RAM 16GB',
        'hardware'
    ),
    (
        'Ryzen 5 5600X',
        'Processador AMD Ryzen 5 5600X com alto desempenho para jogos e aplicações exigentes, oferecendo excelente equilíbrio entre potência e eficiência.',
        1999.99,
        'processadorAMDRyzen55600X.webp',
        'Processador Ryzen 5',
        'hardware'
    ),
    (
        'Fonte 750W 80 Plus Gold',
        'Fonte de alimentação de 750W com certificação 80 Plus Gold, garantindo eficiência energética, estabilidade e segurança para seu setup.',
        549.90,
        'fonte750W80PlusGold.webp',
        'Fonte 750W',
        'hardware'
    );

-- RELACIONAMENTOS PRODUTOS x CATEGORIAS
-- (produto_id, categoria_id) — categorias: 1=Acao, 2=RPG, 3=Aventura, 4=FPS, 5=Corrida, 6=Simulacao, 7=Terror, 8=Esporte, 9=Competitivo, 10=Tatico
INSERT INTO
    produtos_categorias (produto_id, categoria_id)
VALUES
    (1, 2),
    (1, 1), -- Cyberpunk: RPG, Acao
    (2, 3),
    (2, 1), -- The Last Of Us: Aventura, Acao
    (3, 3),
    (3, 1),
    (3, 2), -- God of War: Aventura, Acao, RPG
    (4, 2),
    (4, 3), -- The Witcher: RPG, Aventura
    (5, 1),
    (5, 3), -- Horizon: Acao, Aventura
    (6, 2),
    (6, 1), -- Elden Ring: RPG, Acao
    (7, 5),
    (7, 6), -- Forza: Corrida, Simulacao
    (8, 7),
    (8, 1), -- Resident Evil: Terror, Acao
    (9, 1),
    (9, 3), -- Ghost of Tsushima: Acao, Aventura
    (10, 8), -- FIFA: Esporte
    (11, 2),
    (11, 1), -- Kingdom Come: RPG, Acao
    (12, 3),
    (12, 1), -- Clair Obscur: Aventura, Acao
    (13, 4),
    (13, 1), -- COD MW3: FPS, Acao
    (14, 4),
    (14, 9), -- CS2: FPS, Competitivo
    (15, 4),
    (15, 1), -- Battlefield: FPS, Acao
    (16, 4),
    (16, 10), -- Valorant: FPS, Tatico
    (17, 4),
    (17, 1);

-- DOOM: FPS, Acao
-- Hardware usa categorias 11=Console, 12=PC Completo, 13=Controles, 14=Perifericos, 15=Componentes
INSERT INTO
    produtos_categorias (produto_id, categoria_id)
VALUES
    (18, 11), -- PS5: Console
    (19, 11), -- Xbox Series X: Console
    (20, 12), -- PC Gamer: PC Completo
    (21, 13), -- DualSense: Controles
    (22, 14), -- Teclado: Perifericos
    (23, 15), -- RTX 4070: Componentes
    (24, 11), -- Xbox Series S: Console
    (25, 11), -- PS4: Console
    (26, 12), -- Notebook: PC Completo
    (27, 14), -- Monitor: Perifericos
    (28, 14), -- Mouse: Perifericos
    (29, 14), -- Headset: Perifericos
    (30, 13), -- Controle Xbox: Controles
    (31, 15), -- SSD: Componentes
    (32, 15), -- RAM: Componentes
    (33, 15), -- Ryzen: Componentes
    (34, 15);

-- Fonte: Componentes
-- RELACIONAMENTOS PRODUTOS x PLATAFORMAS
-- (produto_id, plataforma_id) — plataformas: 1=PC, 2=PlayStation, 3=Xbox
INSERT INTO
    produtos_plataformas (produto_id, plataforma_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3), -- Cyberpunk: PC, PS, Xbox
    (2, 1),
    (2, 2), -- The Last Of Us: PC, PS
    (3, 1),
    (3, 2), -- God of War: PC, PS
    (4, 1),
    (4, 2),
    (4, 3), -- The Witcher: PC, PS, Xbox
    (5, 2), -- Horizon: PS
    (6, 1),
    (6, 2),
    (6, 3), -- Elden Ring: PC, PS, Xbox
    (7, 1),
    (7, 3), -- Forza: PC, Xbox
    (8, 1),
    (8, 2),
    (8, 3), -- Resident Evil: PC, PS, Xbox
    (9, 2), -- Ghost of Tsushima: PS
    (10, 1),
    (10, 2),
    (10, 3), -- FIFA: PC, PS, Xbox
    (11, 1),
    (11, 2),
    (11, 3), -- Kingdom Come: PC, PS, Xbox
    (12, 1),
    (12, 2),
    (12, 3), -- Clair Obscur: PC, PS, Xbox
    (13, 1),
    (13, 2),
    (13, 3), -- COD MW3: PC, PS, Xbox
    (14, 1), -- CS2: PC
    (15, 1),
    (15, 2),
    (15, 3), -- Battlefield: PC, PS, Xbox
    (16, 1), -- Valorant: PC
    (17, 1),
    (17, 2),
    (17, 3), -- DOOM: PC, PS, Xbox
    (18, 2), -- PS5: PlayStation
    (19, 3), -- Xbox Series X: Xbox
    (20, 1), -- PC Gamer: PC
    (21, 2), -- DualSense: PlayStation
    (22, 1), -- Teclado: PC
    (23, 1), -- RTX 4070: PC
    (24, 3), -- Xbox Series S: Xbox
    (25, 2), -- PS4: PlayStation
    (26, 1), -- Notebook: PC
    (27, 1), -- Monitor: PC
    (28, 1), -- Mouse: PC
    (29, 1), -- Headset: PC
    (30, 3), -- Controle Xbox: Xbox
    (31, 1), -- SSD: PC
    (32, 1), -- RAM: PC
    (33, 1), -- Ryzen: PC
    (34, 1);

-- Fonte: PC