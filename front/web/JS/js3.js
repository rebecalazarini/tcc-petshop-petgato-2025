const dadosFront = "/assets/produtos.json";
let produtos = [];


fetch(dadosFront)
    .then(resp => resp.json())
    .then(dados => {
        produtos = dados;
        mostrarProdutos(dados);
    })
    .catch(error => {
        console.error('Erro ao carregar produtos:', error);
    });

// Função para exibir os produtos
function mostrarProdutos(produtos) {
    const container = document.getElementById('produtos-container');
    produtos.forEach((produto, index) => {
        const card = `
            <div class="card">
                <h2>${produto.nome}</h2>
                <img src="${produto.imagem}" alt="${produto.nome}">
                <p>R$ ${produto.preco.toFixed(2)}</p>
                <button onclick="mostrarDetalhes(${index})">Detalhes</button>
            </div>
        `;
        container.innerHTML += card;
    });
}

// Função para mostrar os detalhes do produto no modal
function mostrarDetalhes(index) {
    const produto = produtos[index];
    const conteudo = document.getElementById('conteudo');
    const frete = (produto.preco * 0.1).toFixed(2);

    conteudo.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
        <p>Frete: R$ ${frete}</p>
    `;
    document.getElementById('detalhes').classList.remove('oculto');
    document.getElementById('adicionarCarrinho').setAttribute('data-id', produto.id);
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById('detalhes').classList.add('oculto');
}

// Função para adicionar produto ao carrinho
function adicionarCarrinho() {
    const idProduto = document.getElementById('adicionarCarrinho').getAttribute('data-id');
    const produto = produtos.find(p => p.id == idProduto);

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtoNoCarrinho = carrinho.find(p => p.id === produto.id);

    if (produtoNoCarrinho) {
        produtoNoCarrinho.quantidade += 1;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    fecharModal();
}

 const openButton = document.getElementById('open-button');
  const closeButton = document.getElementById('close-button');
  const popup = document.getElementById('popup');

  openButton.addEventListener('click', () => {
    popup.classList.add('show');
  });

  closeButton.addEventListener('click', () => {
    popup.classList.remove('show');
  });

  // Fecha ao clicar fora
  window.addEventListener('click', function(event) {
    if (!popup.contains(event.target) && event.target !== openButton) {
      popup.classList.remove('show');
    }
  });