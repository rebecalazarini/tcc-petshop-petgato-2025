const express = require('express');
const routes = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || 'meu_segredo_jwt';

const User = require('./controllers/user.js');
const Consulta = require('./controllers/consulta.js');
const Login = require('./controllers/login.js');

routes.get('/', (req, res) => {
    res.json({ message: 'Rota funcionando!' });
});

routes.post('/login', Login.login);

routes.post('/usuarios', User.create);

routes.get('/usuarios', Login.authenticateToken, User.read);
routes.put('/usuarios/:id', Login.authenticateToken, User.update);
routes.delete('/usuarios/:id', Login.authenticateToken, User.remove);


routes.post('/consultas', Login.authenticateToken, Consulta.create);
routes.get('/consultas', Login.authenticateToken, Consulta.read);
routes.put('/consultas/:id', Login.authenticateToken, Consulta.update);
routes.delete('/consultas/:id', Login.authenticateToken, Consulta.remove);


module.exports = routes;
