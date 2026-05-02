<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?= CSS_URL ?>/main.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet">

    <script>
        const BASE_URL = "<?= BASE_URL ?>";
        const usuarioLogado = <?= isset($_SESSION['usuario'])
                                    ? json_encode($_SESSION['usuario'])
                                    : 'null' ?>;
    </script>

    <title><?= $tituloPagina ?? 'GameStore' ?></title>
</head>