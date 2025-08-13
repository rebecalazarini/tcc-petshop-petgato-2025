const express = require('express');
const routes = express.Router();

const User = require('./controllers/user.js');
const Consulta = require('./controllers/consulta.js');
const Login = require('./controllers/login.js');
const MiddlewareAuth = require('../src/middlewares/auth');

routes.get('/', (req, res) => {
    res.json({ message: 'Rota funcionando!' });
});

routes.post('/api/login', Login.login);
routes.get('/api/login', Login.validaToken);

routes.get('/api/users', MiddlewareAuth.validate, User.read);
routes.post('/api/users', MiddlewareAuth.validate, User.create);
routes.patch('/api/users', MiddlewareAuth.validate, User.reset);
routes.patch('/api/users/:id', MiddlewareAuth.validate, User.update);
routes.delete('/api/users/:id', MiddlewareAuth.validate, User.del);


routes.post('/c', Consulta.create);
routes.get('/c', Consulta.read);
routes.get('/c/:id', Consulta.readOne);
routes.put('/c/:id', Consulta.update);
routes.delete('/c/:id', Consulta.remove);

module.exports = routes;
