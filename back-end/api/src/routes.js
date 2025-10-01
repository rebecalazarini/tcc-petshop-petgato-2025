const express = require('express');
const routes = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || 'meu_segredo_jwt';

const User = require('./controllers/user.js');
const Consulta = require('./controllers/consulta.js');
const Login = require('./controllers/login.js');
const auth = require('./middleware/auth.js');
const Produtos = require('./controllers/produtos.js');

routes.get('/', (req, res) => {
    res.json({ message: 'Rota funcionando!' });
});


routes.post('/cadastro', User.create);
routes.get('/cadastro', User.read);
routes.get('/cadastro/:id', User.read);
routes.patch('/cadastro/:id', User.update); 
routes.delete('/cadastro/:id', User.remove);

routes.post('/login', Login.login);//post do token
routes.post('/logado', auth.validaToken);

routes.get('/usuarios', auth.validate, Login.read);
routes.get('/usuarios/:id', Login.read);
routes.post('/usuarios', Login.create);
routes.patch('/usuarios/:id', auth.validate, Login.update);
routes.delete('/usuarios/:id', auth.validate, Login.del);

routes.post('/consultas', Consulta.create);
routes.get('/consultas', Consulta.read);
routes.patch('/consultas/:id', Consulta.update);
routes.delete('/consultas/:id', Consulta.remove);

routes.post('/produtos', Produtos.create);
routes.get('/produtos', Produtos.read);
routes.get('/produtos/:id', Produtos.readById);
routes.patch('/produtos/:id', Produtos.update);
routes.delete('/produtos/:id', Produtos.remove);


module.exports = routes;
