const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.json());

// Dados de exemplo
const usuarios = [
    { email: "admin@example.com", senha: "1234", tipo: "adm" },
    { email: "funcionario@example.com", senha: "1234", tipo: "funcionario" },
    { email: "cliente@example.com", senha: "1234", tipo: "cliente" }
];

// Rota de login
app.post("/login", (req, res) => {
    const { email, senha } = req.body;
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (usuario) {
        // Configuração do e-mail
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "seu-email@gmail.com",
                pass: "sua-senha"
            }
        });

        const mailOptions = {
            from: "seu-email@gmail.com",
            to: "seu-celular@gmail.com",
            subject: "Confirmação de Login",
            text: `Você é um ${usuario.tipo}. Deseja continuar?`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).send("Erro ao enviar e-mail.");
            }
            res.status(200).json({ mensagem: `Email enviado para ${usuario.tipo}.`, tipo: usuario.tipo });
        });
    } else {
        res.status(401).send("Credenciais inválidas.");
    }
});

// Rota de cadastro
app.post("/cadastrar", (req, res) => {
    const { email, senha, tipo } = req.body;

    // Verificar se o email já existe
    const usuarioExistente = usuarios.find(u => u.email === email);
    if (usuarioExistente) {
        return res.status(400).send("Usuário já cadastrado.");
    }

    // Adicionar novo usuário
    usuarios.push({ email, senha, tipo });

    // Configuração do Nodemailer
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "seu-email@gmail.com",
            pass: "sua-senha"
        }
    });

    const mailOptions = {
        from: "seu-email@gmail.com",
        to: email,
        subject: "Cadastro realizado com sucesso!",
        text: `Bem-vindo! Seu cadastro foi realizado como ${tipo}.`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return res.status(500).send("Erro ao enviar e-mail.");
        }
        res.status(200).send("Cadastro realizado e email enviado!");
    });
});

// Inicialização do servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
