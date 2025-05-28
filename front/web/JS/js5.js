async function Cadastrar() {
<<<<<<< HEAD
    const email = document.getElementById("emailProprietario").value;
    const nomepet = document.getElementById("nomePet").value;
    const especie = document.querySelector('input[name="especiePet"]:checked').value; // Captura o valor do rádio selecionado
    const raca = document.getElementById("racaPet").value;
    const nomeproprietario = document.getElementById("nomeProprietario").value;
    const datanascpet = document.getElementById("nascpet").value;
    const alergia = document.getElementById("dados").value;

    if (!nomepet || !especie || !raca || !nomeproprietario || !datanascpet || !email || !alergia) {
=======
    const emailProprietario = document.getElementById("emailProprietarioProprietario")?.value;
    const nomePet = document.getElementById("nomePet")?.value;
    const especiePet = document.querySelector('input[name="especiePet"]:checked')?.value;
    const racaPet = document.getElementById("racaPetPet")?.value;
    const nomeProprietario = document.getElementById("nomeProprietario")?.value;
    const nascpet = document.getElementById("nascpet")?.value;
    const dados = document.getElementById("dados")?.value;

    if (!nomePet || !especiePet || !racaPet || !nomeProprietario || !nascpet || !emailProprietario || !dados) {
>>>>>>> 5f394762c437437871c56fe190f8e3f9bc6aeec3
        alert("Por favor, preencha os campos corretamente.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/c", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
<<<<<<< HEAD
            body: JSON.stringify({ email, nomepet, especie, raca, nomeproprietario, datanascpet, alergia })
=======
            body: JSON.stringify({ emailProprietario, nomePet, especiePet, racaPet, nomeProprietario, nascpet, dados })
>>>>>>> 5f394762c437437871c56fe190f8e3f9bc6aeec3
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
