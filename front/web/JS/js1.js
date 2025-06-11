async function Cadastrar() {
    const email = document.getElementById("Email").value;
    const senha = document.getElementById("Senha").value;

    if (!email || !senha) {
        alert("Por favor, preencha os campos de email e senha.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/u", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        if (response.ok) {
            alert("Cadastro realizado com sucesso! Verifique seu email.");
            window.location.href = "index.html";
        } else {
            const erro = await response.text();
            alert(`Erro ao cadastrar: ${erro}`);
        }
    } catch (error) {
        console.error("Erro na solicitação:", error);
        alert("Erro ao processar o cadastro.");
    }
}

async function Voltar() {
    const email = document.getElementById("Email").value;
    const senha = document.getElementById("Senha").value;

    if (!email || !senha) {
        window.location.href = "index.html;"
    }
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

  const menuToggle = document.getElementById('menu-toggle');
const slideMenu = document.getElementById('slide-menu');

menuToggle.addEventListener('click',() => {
   slideMenu.classList.toggle('active');
   menuToggle.classList.toggle('active');
});