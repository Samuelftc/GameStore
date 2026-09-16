# GameStore

Sistema completo de e-commerce de jogos digitais e hardware. Aplicação full-stack com autenticação de usuários, gerenciamento de carrinho, processamento de pedidos e painel administrativo (em desenvolvimento).

---

## Sobre o projeto

GameStore é uma loja online de jogos e hardware com arquitetura moderna, separando claramente back-end (APIs RESTful) do front-end (JavaScript vanilla). O projeto demonstra boas práticas em segurança, organização de código e integração entre camadas.

**Objetivo:** Consolidar conhecimentos em desenvolvimento full-stack com ênfase em segurança, arquitetura limpa e experiência do usuário.

---

## Funcionalidades

### Implementadas

- **Autenticação** — Login, cadastro, logout com sessões seguras
- **Carrinho de compras** — Adicionar, remover, atualizar quantidade (com persistência no BD)
- **Catálogo dinâmico** — Listagem de jogos e hardware com filtros por categoria/plataforma
- **Detalhe do produto** — Visualização completa de cada item
- **Checkout** — Fluxo completo de finalização de compra
- **Pedidos** — Criação, listagem, visualização de histórico de compras
- **Perfil do usuário** — Dados pessoais, quantidade de compras
- **Interface responsiva** — Otimizada para mobile, tablet e desktop

### Em progresso

- Painel administrativo (listar pedidos, usuários, status)
- Recuperação de senha por email
- Alterar dados do usuário
- Trocar senha

---

## Tecnologias

### Front-end
- **HTML5** — Estrutura semântica
- **CSS3** — Layout responsivo, animações
- **JavaScript** — Vanilla JS, Fetch API, tratamento de eventos

### Back-end
- **PHP 7.4+** — Processamento server-side
- **MySQL** — Banco de dados relacional
- **PDO** — Prepared statements (segurança contra SQL injection)

### Segurança
- `password_hash()` / `password_verify()` para senhas
- Prepared statements em todas as queries
- Session segura com `session_regenerate_id()`
- Autenticação obrigatória nas APIs sensíveis
- Validação de autorização (usuário acessa só seus dados)

---

## Como executar

### Requisitos
- PHP 7.4+
- MySQL 5.7+
- Servidor local (XAMPP, WAMP, Laragon)

### Passos

1. **Clone o repositório:**
```bash
git clone https://github.com/samuel208-max/gamestore.git
cd gamestore
```

2. **Configure o banco de dados:**
   - Importe `database/banco.sql` no phpMyAdmin
   - Importe `database/inserts.sql` para dados iniciais

3. **Configure a conexão (se necessário):**
   - Edite `config/conexao.php` com suas credenciais MySQL

4. **Execute em servidor local:**
```bash
# No XAMPP, coloque a pasta em htdocs/
# Acesse no navegador:
http://localhost/GameStore/
```

---

## Documentação Interativa (Swagger)

A API possui documentação completa e **testável** via Swagger UI:

```
http://localhost/GameStore/swagger-ui.html
```

**O que você encontra lá:**
- ✅ Todos os 13 endpoints documentados
- ✅ Descrição de cada endpoint
- ✅ Exemplos de requisição e resposta
- ✅ Parâmetros obrigatórios/opcionais
- ✅ **Testar a API diretamente na interface** (sem precisar de Postman)

**Como testar:**
1. Acesse `http://localhost/GameStore/swagger-ui.html`
2. Clique em um endpoint (ex: "Fazer login")
3. Clique em "Try it out"
4. Preencha os valores
5. Clique em "Execute"
6. Veja a resposta em tempo real

**Arquivos relacionados:**
- `swagger.yaml` — Especificação OpenAPI 3.0 completa
- `swagger-ui.html` — Interface visual interativa para testar a API

---

## Estrutura do projeto

```
GameStore/
├── API/                          # Endpoints RESTful
│   ├── auth/                    # Login, cadastro, logout
│   ├── carrinho/                # CRUD do carrinho
│   ├── pedidos/                 # Criar, listar, obter pedidos
│   └── produtos/                # Listar e filtrar produtos
├── assets/
│   ├── css/                     # Estilos das páginas
│   ├── js/                      # Lógica front-end
│   └── images/                  # Imagens de produtos
├── config/
│   ├── conexao.php              # Conexão PDO com BD
│   └── config.php               # Constantes da app
├── database/
│   ├── banco.sql                # Schema do BD
│   └── inserts.sql              # Dados iniciais
├── includes/
│   ├── head.php                 # Meta tags, scripts globais
│   ├── header.php               # Navbar
│   ├── footer.php               # Footer, scripts
│   ├── carrinho.php             # Sidebar do carrinho
│   └── meuPerfil.php            # Sidebar de perfil
├── models/                       # Camada de dados
│   ├── usuarioModel.php
│   ├── produtosModel.php
│   ├── carrinhoModel.php
│   └── pedidoModel.php
├── public/                       # Páginas visíveis
│   ├── index.php                # Home
│   ├── auth.php                 # Login/Cadastro
│   ├── catalogo.php             # Listagem de jogos
│   ├── hardware.php             # Listagem de hardware
│   ├── produto.php              # Detalhes do produto
│   ├── checkout.php             # Resumo antes de pagar
│   ├── confirmacaoCompra.php    # Confirmação do pedido
│   └── minhasCompras.php        # Histórico de compras
├── swagger.yaml                  # Documentação OpenAPI
├── swagger-ui.html              # Interface Swagger UI
└── README.md
```

---

## Segurança

- ✅ Queries com prepared statements (sem SQL injection)
- ✅ Hashing de senhas com `password_hash()` (bcrypt)
- ✅ Session regeneration após login
- ✅ Validação de autorização (usuário acessa só seus dados)
- ✅ JSON responses com Content-Type correto
- ✅ HTTP status codes apropriados

---

## Fluxo do usuário

1. **Visitante** → Visualiza produtos, tenta adicionar ao carrinho → Redirecionado pra login
2. **Novo usuário** → Cadastra-se com email, nome, senha forte
3. **Usuário logado** → Adiciona itens ao carrinho, vê resumo, finaliza compra
4. **Pós-compra** → Recebe confirmação, pode ver histórico de pedidos

---

## Exemplos de uso

### Adicionar ao carrinho
```javascript
POST /API/carrinho/adicionar.php
{
  "produto_id": 1,
  "quantidade": 1
}
```

### Fazer login
```javascript
POST /API/auth/login.php
{
  "email": "user@example.com",
  "senha": "Senha123!"
}
```

### Listar pedidos do usuário
```javascript
GET /API/pedidos/listar.php
// Retorna array de pedidos com itens
```

---

## Status

✅ **Funcionalidades core:** Completas e testadas  
✅ **Documentação:** Swagger OpenAPI completo  
🚧 **Extras:** Painel admin, recuperação de senha em progresso  
📋 **Próximo:** Testes automatizados, deploy

---

## Autor

[Samuel Ferreira](https://github.com/Samuelftc)

---

## Licença

Projeto de estudos — livre para uso e modificação.
