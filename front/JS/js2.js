async function Cadastrar() {
    const email = document.getElementById("Email").value;
    const senha = document.getElementById("Senha").value;
    const tipo = prompt("Digite seu tipo: adm, funcionario ou cliente");

    try {
        const response = await fetch("/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha, tipo })
        });

        if (response.ok) {
            alert("Cadastro realizado com sucesso! Verifique seu email.");
            window.location.href = "front.html"; // Redirecionar para outra página
        } else {
            const erro = await response.text();
            alert(`Erro ao cadastrar: ${erro}`);
        }
    } catch (error) {
        console.error("Erro na solicitação:", error);
        alert("Erro ao processar o cadastro.");
    }
}
