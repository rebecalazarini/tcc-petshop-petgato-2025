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
            window.location.href = "front.html"; // Redireciona para a página principal
        } else {
            const erro = await response.text();
            alert(`Erro ao cadastrar: ${erro}`);
        }
    } catch (error) {
        console.error("Erro na solicitação:", error);
        alert("Erro ao processar o cadastro.");
    }
}