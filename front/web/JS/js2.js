// Seleciona os elementos do formulário
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();  // Previne o envio do formulário

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    // Faz a requisição POST para /login
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      const token = data.token;  // Token de autenticação
      console.log("Token recebido:", token);
      sessionStorage.setItem('token', token);  // Armazena o token no sessionStorage
      alert('Login bem-sucedido!');
    } else {
      alert('Erro no login: ' + data.error);  // Mostra a mensagem de erro recebida
    }
  } catch (error) {
    console.error('Erro de rede:', error);
    alert('Ocorreu um erro ao tentar conectar com o servidor.');
  }
});


// Função para enviar dados protegidos com o token
async function fetchProtectedData() {
    const token = sessionStorage.getItem('token');  // Pega o token do sessionStorage

    if (!token) {
        alert('Você precisa estar logado para acessar essa página.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/usuarios', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Envia o token no cabeçalho
            },
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Dados protegidos:', data);
        } else {
            console.error('Erro ao acessar dados protegidos:', data);
        }
    } catch (error) {
        console.error('Erro de rede:', error);
    }
}
