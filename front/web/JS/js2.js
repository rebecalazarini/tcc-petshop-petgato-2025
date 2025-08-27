const openButton = document.getElementById('open-button');
const closeButton = document.getElementById('close-button');
const popup = document.getElementById('popup');

openButton.addEventListener('click', () => {
  popup.classList.add('show');
});

closeButton.addEventListener('click', () => {
  popup.classList.remove('show');
});

window.addEventListener('click', function(event) {
  if (!popup.contains(event.target) && event.target !== openButton) {
    popup.classList.remove('show');
  }
});

const menuToggle = document.getElementById('menu-toggle');
const slideMenu = document.getElementById('slide-menu');

menuToggle.addEventListener('click',() => {
   slideMenu.classList.toggle('active');
   menuToggle.classList.toggle('active');
});

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            alert('Login bem-sucedido!');
        } else {
            alert('Erro no login: ' + data.error);
        }
    } catch (error) {
        console.error('Erro de rede:', error);
        alert('Ocorreu um erro ao tentar conectar com o servidor.');
    }
});