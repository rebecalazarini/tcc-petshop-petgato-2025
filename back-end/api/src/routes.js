const express = require('express');
const routes = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || 'meu_segredo_jwt';

const User = require('./controllers/user.js');
const Consulta = require('./controllers/consulta.js');
const Login = require('./controllers/login.js');

routes.get('/', (req, res) => {
    res.json({ message: 'Rota funcionando!' });
});


routes.post('/usuarios', User.create);
routes.get('/usuarios', User.read);

routes.post('/cadastro', User.create);
routes.get('/cadastro', User.read);
routes.patch('/cadastro', User.update);
routes.delete('/cadastro', User.remove);

routes.post('/login', Login.create);
routes.get('/login', Login.read);
routes.patch('/login/:id', Login.update);
routes.delete('/login/:id', Login.remove);

routes.post('/consultas', Consulta.create);
routes.get('/consultas', Consulta.read);
routes.patch('/consultas/:id', Consulta.update);
routes.delete('/consultas/:id', Consulta.remove);

module.exports = routes;
