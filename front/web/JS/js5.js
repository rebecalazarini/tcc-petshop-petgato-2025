async function Cadastrar() {
    const email = document.getElementById("emailProprietario").value;
    const nomepet = document.getElementById("nomePet").value;
    const especie = document.querySelector('input[name="especiePet"]:checked').value; // Captura o valor do rádio selecionado
    const raca = document.getElementById("racaPet").value;
    const idade = document.getElementById("idadePet").value;
    const nomeproprietario = document.getElementById("nomeProprietario").value;
    const datanascpet = document.getElementById("nascpet").value;
    const alergia = document.getElementById("dados").value;

    if (!nomepet || !especie || !raca || !idade || !nomeproprietario || !datanascpet || !email || !alergia) {
        alert("Por favor, preencha os campos corretamente.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/c", { // Rota alterada para /c
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, nomepet, especie, raca, idade, nomeproprietario, datanascpet, alergia })
        });

        if (response.ok) {
            alert("Cadastro realizado com sucesso!.");
            window.location.href = "index.html"; // Redireciona para a página principal
        } else {
            const erro = await response.text();
            alert(`Erro ao cadastrar: ${erro}`);
        }
    } catch (error) {
        console.error("Erro na solicitação:", error);
        alert("Erro ao processar o cadastro.");
    }
}
