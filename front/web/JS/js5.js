async function Cadastrar() {
    const emailProprietario = document.getElementById("emailProprietarioProprietario")?.value;
    const nomePet = document.getElementById("nomePet")?.value;
    const especiePet = document.querySelector('input[name="especiePet"]:checked')?.value;
    const racaPet = document.getElementById("racaPetPet")?.value;
    const nomeProprietario = document.getElementById("nomeProprietario")?.value;
    const nascpet = document.getElementById("nascpet")?.value;
    const dados = document.getElementById("dados")?.value;

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
