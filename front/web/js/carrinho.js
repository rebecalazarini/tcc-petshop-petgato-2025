function carregarCarrinho() {
  const lista = document.getElementById('listaCarrinho');
  const totalEl = document.getElementById('total');
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  let total = 0;
  lista.innerHTML = '';

  carrinho.forEach((p, i) => {
    total += parseFloat(p.preco);
    const item = document.createElement('div');
    item.innerHTML = `
      <p>${p.nome} - R$ ${p.preco}</p>
      <button onclick="removerItem(${i})">Remover</button>
    `;
    lista.appendChild(item);
  });

  totalEl.textContent = total.toFixed(2);
}

function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  carregarCarrinho();
}

document.getElementById('aplicarCupom').addEventListener('click', () => {
  const cupom = document.getElementById('cupom').value.trim().toLowerCase();
  const totalEl = document.getElementById('total');
  let total = parseFloat(totalEl.textContent);

  if (cupom === 'desconto5') {
    total *= 0.95;
    alert('Cupom aplicado! 5% de desconto.');
    totalEl.textContent = total.toFixed(2);
  } else {
    alert('Cupom inválido.');
  }
});

document.getElementById('pagamento').addEventListener('change', e => {
  const parcelas = document.getElementById('parcelas');
  parcelas.style.display = e.target.value === 'credito' ? 'block' : 'none';
});

document.getElementById('pagamento').addEventListener('change', e => {
  const parcelas = document.getElementById('parcelas');
  const pixDiv = document.getElementById('pagamentoPix');
  const cartaoDiv = document.getElementById('pagamentoCartao');

  parcelas.style.display = 'none';
  pixDiv.style.display = 'none';
  cartaoDiv.style.display = 'none';

  if (e.target.value === 'credito') {
    parcelas.style.display = 'block';
    cartaoDiv.style.display = 'block';
  } else if (e.target.value === 'debito') {
    cartaoDiv.style.display = 'block';
  } else if (e.target.value === 'pix') {
    pixDiv.style.display = 'block';
    gerarQrCodePix();
  }
});

function gerarQrCodePix() {
  const total = document.getElementById('total').textContent;
  const chavePix = 'petgato@exemplo.com';
  const conteudoPix = `Pagamento PIX\nChave: ${chavePix}\nValor: R$ ${total}`;
  QRCode.toCanvas(document.getElementById('qrCodePix'), conteudoPix, function (error) {
    if (error) console.error(error);
  });
}

document.getElementById('finalizar').addEventListener('click', async () => {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const pagamento = document.getElementById('pagamento').value;
  const total = document.getElementById('total').textContent;

  const entrega = {
    nome: document.getElementById('nome').value,
    endereco: document.getElementById('endereco').value,
    bairro: document.getElementById('bairro').value,
    cidade: document.getElementById('cidade').value,
    cep: document.getElementById('cep').value,
    telefone: document.getElementById('telefone').value
  };

  if (!entrega.nome || !entrega.endereco || !entrega.cidade || !entrega.cep) {
    alert('Por favor, preencha todas as informações de entrega.');
    return;
  }

  let mensagem = `*Novo pedido da loja PetGatô!*\n\n`;
  mensagem += `*Nome:* ${entrega.nome}\n`;
  mensagem += `*Endereço:* ${entrega.endereco}, ${entrega.bairro}, ${entrega.cidade}\n`;
  mensagem += ` *Telefone:* ${entrega.telefone}\n`;
  mensagem += ` *CEP:* ${entrega.cep}\n\n`;
  mensagem += `*Itens do pedido:*\n`;

  carrinho.forEach(p => {
    mensagem += `• ${p.nome} - R$ ${p.preco}\n`;
  });
  mensagem += `\n*Total:* R$ ${total}\n`;

if (pagamento === 'pix') {
  mensagem += ` *Pagamento:* PIX (cliente vai enviar o comprovante)\n\n`;
} else if (pagamento === 'credito') {
  mensagem += `*Pagamento:* Cartão de Crédito (simulado)\n\n`;
} else if (pagamento === 'debito') {
  mensagem += ` *Pagamento:* Cartão de Débito (simulado)\n\n`;
} else {
  mensagem += ` *Pagamento:* ${pagamento.toUpperCase()}\n\n`;
}

mensagem += ` Mensagem enviada automaticamente.`;


  const numeroVendedor = '5519987735021';
  const link = `https://wa.me/${numeroVendedor}?text=${encodeURIComponent(mensagem)}`;
  alert('O pedido será enviado para o WhatsApp do vendedor...');
  window.open(link, '_blank');
  localStorage.removeItem('carrinho');
});

window.addEventListener('DOMContentLoaded', carregarCarrinho);
