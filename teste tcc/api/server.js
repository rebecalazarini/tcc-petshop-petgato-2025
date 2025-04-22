const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const routes = require('./src/routes');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/petshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.log('Erro ao conectar ao MongoDB', err));


const funcionarioRoutes = require('./routes/funcionarioRoutes');
app.use('/funcionarios', funcionarioRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
