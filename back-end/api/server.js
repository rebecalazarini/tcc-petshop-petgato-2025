const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./src/swagger.json');
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const routes = require('./src/routes.js');

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


   // Servidor rodando
app.listen(3001, (req,res) =>{
    console.log('API respondendo em http://localhost:3001');
    console.log('Documentação em http://localhost:3001/docs');
});




