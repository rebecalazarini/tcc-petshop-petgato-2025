const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();


const prisma = new PrismaClient();
const app = express();
const PORT = 3000;
const mysql = require("mysql2");

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Testando a conexão
db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
    } else {
        console.log("Conexão ao banco de dados MySQL bem-sucedida!");
    }
});


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rota para cadastrar um usuário

app.post("/cadastrar", async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send("Email e senha são obrigatórios.");
    }

    try {
        const novoUsuario = await prisma.user.create({
            data: { email, senha }
        });

        res.status(200).send("Usuário cadastrado com sucesso!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao cadastrar o usuário.");
    }
});


   // Servidor rodando
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});