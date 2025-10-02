const dadosAPI = "https://back-end-tcc-gamma.vercel.app/produto"; // URL da sua API
let produtos = [];

<<<<<<< HEAD
// Busca os dados dos produtos e exibe na página
fetch(dadosFront)
=======
fetch(dadosAPI)
>>>>>>> 2a95f5996f7cb2709bf426d7c5eed39b7fd9940f
    .then(resp => resp.json())
    .then(dados => {
        produtos = dados;
        mostrarProdutos(dados);
<<<<<<< HEAD
        updateView(); // Atualiza a visualização após carregar os produtos
=======
        updateView();
>>>>>>> 2a95f5996f7cb2709bf426d7c5eed39b7fd9940f
    })
    .catch(error => {
        console.error('Erro ao carregar produtos da API:', error);
    });

<<<<<<< HEAD
// Função para exibir os produtos no container
=======

>>>>>>> 2a95f5996f7cb2709bf426d7c5eed39b7fd9940f
function mostrarProdutos(produtos) {
    const container = document.getElementById('produtos-container');
    container.innerHTML = ''; // Limpa o container antes de adicionar novos cards
    produtos.forEach((produto, index) => {
        const card = `
            <div class="card">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h2>${produto.nome}</h2>
                <p>R$ ${produto.preco.toFixed(2)}</p>
                <div class="button-group">
<<<<<<< HEAD
                    <button class="botao1" onclick="mostrarDetalhes(${index}})">
                        <img src="../web/images/favorito.png" alt="carrinho.html">
=======
                    <button class="botao1" onclick="mostrarDetalhes(${index})">
                        <img src="../web/images/favorito.png" alt="Favorito">
>>>>>>> 2a95f5996f7cb2709bf426d7c5eed39b7fd9940f
                    </button>
                    <button class="botao1" onclick="mostrarDetalhes(${index})">
                        <img src="../web/images/adicionar-ao-carrinho.png" alt="Adicionar ao carrinho">
                    </button>
                    <button onclick="mostrarDetalhes(${index})">Detalhes</button>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}



fetch("https://back-end-tcc-gamma.vercel.app/produto")
    .then(async response => {
        if (!response.ok) {
            const text = await response.text();
          throw new Error(text); // Lança o erro com o corpo da resposta
        }
        return response.json();
    })
    .then(data => {
        console.log("Produtos:", data);
    })
    .catch(error => {
        console.error("Erro:", error);
    });





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

function fecharModal() {
    document.getElementById('detalhes').classList.add('oculto');
}

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

<<<<<<< HEAD
// Carousel - Seleciona imagens e botões
=======
>>>>>>> 2a95f5996f7cb2709bf426d7c5eed39b7fd9940f
const imgs = document.querySelectorAll('.carousel img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const indicatorsContainer = document.querySelector('.carousel-indicators');

<<<<<<< HEAD
let index = 0; // índice da imagem central
let autoSlide; // autoplay

// Cria as bolinhas de acordo com a quantidade de imagens
imgs.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active-dot'); // primeira bolinha ativa
    dot.addEventListener('click', () => {
        index = i;
        updateCarousel();
        resetAuto();
    });
    indicatorsContainer.appendChild(dot);
});

=======

let index = 0; // índice da imagem central
let autoSlide; // autoplay

// Cria as bolinhas de acordo com a quantidade de imagens
imgs.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active-dot'); // primeira bolinha ativa
    dot.addEventListener('click', () => {
        index = i;
        updateCarousel();
        resetAuto();
    });
    indicatorsContainer.appendChild(dot);
});

>>>>>>> 2a95f5996f7cb2709bf426d7c5eed39b7fd9940f
const dots = document.querySelectorAll('.dot');

// Atualiza classes das imagens e bolinhas
function updateCarousel() {
    imgs.forEach((img, i) => {
        img.classList.remove('active', 'left', 'right', 'hidden');

        if (i === index) {
            img.classList.add('active'); // central
        } else if (i === (index - 1 + imgs.length) % imgs.length) {
            img.classList.add('left'); // esquerda
        } else if (i === (index + 1) % imgs.length) {
            img.classList.add('right'); // direita
        } else {
            img.classList.add('hidden'); // fora do foco
        }
    });

    // Atualiza bolinhas
    dots.forEach((dot, i) => {
        dot.classList.toggle('active-dot', i === index);
    });
}

<<<<<<< HEAD
// Próxima imagem
=======
>>>>>>> 2a95f5996f7cb2709bf426d7c5eed39b7fd9940f
function next() {
    index = (index + 1) % imgs.length;
    updateCarousel();
}

// Imagem anterior
function prev() {
    index = (index - 1 + imgs.length) % imgs.length;
    updateCarousel();
}

// Reinicia autoplay
function resetAuto() {
    clearInterval(autoSlide);
    autoSlide = setInterval(next, 4000);
}

// Eventos dos botões
nextBtn.addEventListener('click', () => {
    next();
    resetAuto();
});
prevBtn.addEventListener('click', () => {
    prev();
    resetAuto();
});

// Inicia autoplay
autoSlide = setInterval(next, 4000);

// Inicializa carousel
updateCarousel();

// Banner texto com mudança de cor
const texts = document.querySelectorAll('.banner-text');
let currentIndex = 0;

function changeText() {
    // Remove a classe 'active' de todos os textos e reseta cor
    texts.forEach((text) => {
        text.classList.remove('active');
        text.style.color = '#f7f7f7ff';
    });
    // Ativa o texto atual e muda a cor para uma cor aleatória
    texts[currentIndex].classList.add('active');
    texts[currentIndex].style.color = getRandomColor();

    // Atualiza o índice para o próximo texto
    currentIndex = (currentIndex + 1) % texts.length;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Inicia o carousel de textos
changeText();
setInterval(changeText, 3000);

// Banner background color change
const banner = document.querySelector(".banner");
const bannerTexts = document.querySelectorAll(".banner-text");
let bannerIndex = 0;

function showNextText() {
    bannerTexts.forEach(text => text.classList.remove("active"));
    bannerTexts[bannerIndex].classList.add("active");

    // Muda a cor do banner conforme o texto ativo
    if (bannerIndex === 0) banner.style.backgroundColor = "#00a6f3f6";
    else if (bannerIndex === 1) banner.style.backgroundColor = "#0303fffb";
    else if (bannerIndex === 2) banner.style.backgroundColor = "#eeff00ff";

    bannerIndex = (bannerIndex + 1) % bannerTexts.length;
}

setInterval(showNextText, 3000);
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const produtosContainer = document.getElementById('produtos-container');

let currentPage = 0;
const cardsPerPage = 4; // quantos cards mostrar por vez

function updateView() {
  const totalCards = produtosContainer.children.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  if (currentPage < 0) currentPage = 0;
  if (currentPage >= totalPages) currentPage = totalPages - 1;

  const card = produtosContainer.querySelector('.card');
  if (!card) return;

  const cardWidth = card.offsetWidth;
  const gap = 10; // deve ser igual ao gap do CSS em px

  // Calcula deslocamento horizontal: (largura do card + gap) * cardsPerPage * currentPage
  const offset = currentPage * (cardWidth + gap) * cardsPerPage;

  produtosContainer.style.transform = `translateX(-${offset}px)`;

  btnPrev.disabled = currentPage === 0;
  btnNext.disabled = currentPage === totalPages - 1;
}

btnPrev.addEventListener('click', () => {
  currentPage--;
  updateView();
});

btnNext.addEventListener('click', () => {
  currentPage++;
  updateView();
});

<<<<<<< HEAD
// Chame updateView após carregar os produtos
// Se produtos são carregados dinamicamente, chame updateView() após mostrarProdutos()
/* ========== JS PARA A SEÇÃO DUPLICADA (COLE APÓS O HTML ACIMA) ========== */
(async function () {
  const DATA_PATHS = ['/assets/produtos.json', 'produtos.json']; // tenta 2 caminhos
  async function fetchProdutos() {
    for (const p of DATA_PATHS) {
      try {
        const resp = await fetch(p);
        if (!resp.ok) continue;
        const json = await resp.json();
        return json;
      } catch (e) {
        // tenta próximo
      }
    }
    throw new Error('Não foi possível carregar produtos.json (verifique o caminho).');
=======


 (async function () {
  const DATA_PATHS = [
    "https://back-end-tcc-gamma.vercel.app/produto"
  ]; // Apenas tenta carregar da URL da API

  async function fetchProdutos() {
    // Tenta carregar os produtos da URL especificada
    for (const p of DATA_PATHS) {
      try {
        const resp = await fetch(p);
        if (!resp.ok) {
          console.error(`Erro ao buscar dados de ${p}: ${resp.statusText}`);
          continue;
        }
        const json = await resp.json();
        return json; // Retorna os dados se a resposta for bem-sucedida
      } catch (e) {
        console.error(`Erro ao fazer requisição para ${p}:`, e);
        // Tenta o próximo caminho, mas no seu caso temos apenas um caminho.
      }
    }
    throw new Error('Não foi possível carregar os produtos da API (verifique o caminho).');
>>>>>>> 2a95f5996f7cb2709bf426d7c5eed39b7fd9940f
  }

  let produtos = [];
  try {
<<<<<<< HEAD
    produtos = await fetchProdutos();
  } catch (err) {
    console.error(err);
    alert('Erro: não foi possível carregar os produtos. Verifique o arquivo produtos.json.');
    return;
=======
    produtos = await fetchProdutos(); // Chama a função que busca os produtos
  } catch (err) {
    console.error(err);
    alert('Erro: não foi possível carregar os produtos. Verifique o arquivo produtos.json.');
    return; // Sai da execução caso falhe ao carregar os produtos
>>>>>>> 2a95f5996f7cb2709bf426d7c5eed39b7fd9940f
  }

  const container = document.getElementById('produtos-container-dup');
  const modal = document.getElementById('detalhes-dup');
  const conteudo = document.getElementById('conteudo-dup');
  const related = document.getElementById('related-dup');
  const btnFechar = document.getElementById('fechar-detalhes-dup');
  const btnAdicionarModal = document.getElementById('adicionarCarrinho-dup');

  // Renderiza cards
<<<<<<< HEAD
  function renderProdutosGrid() {
    container.innerHTML = '';
    produtos.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card-dup';
      card.innerHTML = `
        <img src="${p.imagem || ''}" alt="${escapeHtml(p.nome || '')}">
        <h4>${escapeHtml(p.nome || '')}</h4>
        <p>${(p.descricao || '')}</p>
        <p><strong>R$ ${Number(p.preco ?? 0).toFixed(2)}</strong></p>
        <div class="button-group-dup">
          <button data-action="ver" data-id="${p.id}">Ver Detalhes</button>
          <button data-action="add" data-id="${p.id}">../web</button>
        </div>
      `;
      container.appendChild(card);
    });
  }
=======
  // function renderProdutosGrid() {
  //   container.innerHTML = ''; // Limpa o container antes de renderizar novos cards
  //   produtos.forEach(p => {
  //     const card = document.createElement('div');
  //     card.className = 'card-dup';
  //     card.innerHTML = `
  //       <img src="${p.imagem || ''}" alt="${escapeHtml(p.nome || '')}">
  //       <h4>${escapeHtml(p.nome || '')}</h4>
  //       <p>${(p.descricao || '')}</p>
  //       <p><strong>R$ ${Number(p.preco ?? 0).toFixed(2)}</strong></p>
  //       <div class="button-group-dup">
  //         <button data-action="ver" data-id="${p.id}">Ver Detalhes</button>
  //         <button data-action="add" data-id="${p.id}">Adicionar</button>
  //       </div>
  //     `;
  //     container.appendChild(card);
  //   });
  // }
>>>>>>> 2a95f5996f7cb2709bf426d7c5eed39b7fd9940f

  // Escapa texto para evitar quebra de HTML
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, s =>
<<<<<<< HEAD
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
  }

  // mostra modal com detalhes + produtos relacionados
  function showDetails(id) {
    const produto = produtos.find(p => Number(p.id) === Number(id));
    if (!produto) {
      alert('Produto não encontrado.');
      return;
    }

    const frete = (Number(produto.preco ?? 0) * 0.1).toFixed(2);
    conteudo.innerHTML = `
      <img src="${produto.imagem || ''}" alt="${escapeHtml(produto.nome)}">
      <div>
        <h4>${escapeHtml(produto.nome)}</h4>
        <p>${escapeHtml(produto.descricao || '')}</p>
        <p><strong>Preço: R$ ${Number(produto.preco ?? 0).toFixed(2)}</strong></p>
        <p>Frete estimado: R$ ${frete}</p>
      </div>
    `;

    // preparar botão adicionar do modal
    btnAdicionarModal.setAttribute('data-id', produto.id);

    // gerar produtos relacionados (até 3, excluindo o atual)
    renderRelated(produto.id);

    modal.classList.remove('oculto');
  }

  // Gera N produtos relacionados (aleatórios)
  function renderRelated(currentId, count = 3) {
    const others = produtos.filter(p => Number(p.id) !== Number(currentId));
    shuffleArray(others);
    const selecionados = others.slice(0, count);

    related.innerHTML = '';
    selecionados.forEach(p => {
      const item = document.createElement('div');
      item.className = 'related-item-dup';
      item.innerHTML = `
        <img src="${p.imagem || ''}" alt="${escapeHtml(p.nome)}" style="width:100%;height:70px;object-fit:cover;border-radius:4px">
        <div style="font-size:13px;margin:6px 0">${escapeHtml(p.nome)}</div>
        <div style="font-weight:bold">R$ ${Number(p.preco ?? 0).toFixed(2)}</div>
        <div style="margin-top:6px">
          <button data-action="ver-related" data-id="${p.id}">Ver</button>
          <button data-action="add-related" data-id="${p.id}">Adicionar</button>
        </div>
      `;
      related.appendChild(item);
    });
  }

  // embaralha array in-place (Fisher-Yates)
  function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  }
=======
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[s]);
  }

  // Mostra modal com detalhes + produtos relacionados
  // function showDetails(id) {
  //   const produto = produtos.find(p => Number(p.id) === Number(id));
  //   if (!produto) {
  //     alert('Produto não encontrado.');
  //     return;
  //   }

  //   const frete = (Number(produto.preco ?? 0) * 0.1).toFixed(2);
  //   conteudo.innerHTML = `
  //     <img src="${produto.imagem || ''}" alt="${escapeHtml(produto.nome)}">
  //     <div>
  //       <h4>${escapeHtml(produto.nome)}</h4>
  //       <p>${escapeHtml(produto.descricao || '')}</p>
  //       <p><strong>Preço: R$ ${Number(produto.preco ?? 0).toFixed(2)}</strong></p>
  //       <p>Frete estimado: R$ ${frete}</p>
  //     </div>
  //   `;

  //   // Preparar botão adicionar do modal
  //   btnAdicionarModal.setAttribute('data-id', produto.id);

  //   // Gerar produtos relacionados (até 3, excluindo o atual)
  //   renderRelated(produto.id);

  //   modal.classList.remove('oculto');
  // }

  // // Gera N produtos relacionados (aleatórios)
  // function renderRelated(currentId, count = 3) {
  //   const others = produtos.filter(p => Number(p.id) !== Number(currentId));
  //   shuffleArray(others);
  //   const selecionados = others.slice(0, count);

  //   related.innerHTML = '';
  //   selecionados.forEach(p => {
  //     const item = document.createElement('div');
  //     item.className = 'related-item-dup';
  //     item.innerHTML = `
  //       <img src="${p.imagem || ''}" alt="${escapeHtml(p.nome)}" style="width:100%;height:70px;object-fit:cover;border-radius:4px">
  //       <div style="font-size:13px;margin:6px 0">${escapeHtml(p.nome)}</div>
  //       <div style="font-weight:bold">R$ ${Number(p.preco ?? 0).toFixed(2)}</div>
  //       <div style="margin-top:6px">
  //         <button data-action="ver-related" data-id="${p.id}">Ver</button>
  //         <button data-action="add-related" data-id="${p.id}">Adicionar</button>
  //       </div>
  //     `;
  //     related.appendChild(item);
  //   });
  // }

 // Função para embaralhar itens (produtos relacionados)
//   function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]]; // troca os elementos
//     }
//   }

//   // Inicia a renderização dos produtos
//   renderProdutosGrid();
// })();




>>>>>>> 2a95f5996f7cb2709bf426d7c5eed39b7fd9940f

  // adiciona ao carrinho (localStorage)
  function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => Number(p.id) === Number(id));
    if (!produto) return alert('Produto não encontrado.');

    let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
    const existente = carrinho.find(item => Number(item.id) === Number(id));
    if (existente) {
      existente.quantidade = (existente.quantidade || 1) + 1;
    } else {
      carrinho.push({ ...produto, quantidade: 1 });
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    // notificação simples
    alert(`${produto.nome} adicionado ao carrinho.`);
    // fecha modal (opcional)
    modal.classList.add('oculto');
  }

  // EVENTO: clique nos botões dos cards (delegation)
  container.addEventListener('click', (ev) => {
    const btn = ev.target.closest('button');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id');
    if (!action || !id) return;

    if (action === 'ver') showDetails(id);
    if (action === 'add') adicionarAoCarrinho(id);
  });

  // EVENTO: clicks nos related (delegation)
  related.addEventListener('click', (ev) => {
    const btn = ev.target.closest('button');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id');
    if (!action || !id) return;

    if (action === 'ver-related') showDetails(id);
    if (action === 'add-related') adicionarAoCarrinho(id);
  });

  // botão do modal (adicionar)
  btnAdicionarModal.addEventListener('click', () => {
    const id = btnAdicionarModal.getAttribute('data-id');
    if (!id) return alert('Selecione um produto antes de adicionar.');
    adicionarAoCarrinho(id);
  });

  // fechar modal
  btnFechar.addEventListener('click', () => modal.classList.add('oculto'));

  // fechar modal ao clicar fora da janela
  modal.addEventListener('click', (ev) => {
    if (ev.target === modal) modal.classList.add('oculto');
  });
<<<<<<< HEAD

  // render inicial
  renderProdutosGrid();
=======
>>>>>>> 2a95f5996f7cb2709bf426d7c5eed39b7fd9940f
})();