// URL base do backend na Vercel
const API_BASE_URL = "https://backend-tcc-petshop-petgato-2025.vercel.app";

// Função de login
async function Login() {
  const emailInput = document.getElementById("Email");
  const senhaInput = document.getElementById("password");

  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();

  if (!email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (response.ok) {
      const token = data.token;
      sessionStorage.setItem("token", token);
      alert("Login bem-sucedido!");
      window.location.href = "index.html";
    } else {
      alert("Erro no login: " + (data.error || "Verifique suas credenciais"));
    }
  } catch (error) {
    console.error("Erro de rede:", error);
    alert("Não foi possível conectar ao servidor.");
  }
}

// Função para voltar
function voltar() {
  window.location.href = "index.html";
}

async function fetchProtectedData() {
  const token = sessionStorage.getItem("token");

  if (!token) {
    alert("Você precisa estar logado para acessar essa página.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Dados protegidos:", data);
    } else {
      console.error("Erro ao acessar dados protegidos:", data);
    }
  } catch (error) {
    console.error("Erro de rede:", error);
  }
}