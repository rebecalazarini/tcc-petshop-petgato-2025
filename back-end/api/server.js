const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rota para cadastro
app.post("/cadastrar", (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send("Email e senha são obrigatórios.");
    }

    // Simulação de salvamento no banco de dados
    console.log(`Usuário cadastrado: Email: ${email}, Senha: ${senha}`);

    res.status(200).send("Cadastro realizado com sucesso!");
});

// Servidor rodando
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});