async function Cadastrar() {
    const emailProprietario = document.getElementById("emailProprietario").value;
    const nomePet = document.getElementById("nomePet").value;
    const especiePet = document.querySelector('input[name="especiePet"]:checked').value; 
    const racaPet = document.getElementById("racaPet").value;
    const nomeProprietario = document.getElementById("nomeProprietario").value;
    const nascpet = document.getElementById("nascpet").value;
    const dados = document.getElementById("dados").value;

    if (!nomePet || !especiePet || !racaPet || !nomeProprietario || !nascpet || !emailProprietario || !dados) {
        alert("Por favor, preencha os campos corretamente.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/c", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ emailProprietario, nomePet, especiePet, racaPet, nomeProprietario, nascpet, dados })
        });

        if (response.ok) {
            alert("Cadastro realizado com sucesso!.");
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