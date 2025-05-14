const express = require('express');
const routes = express.Router();

const User = require('./controllers/user.js');
const Consulta = require('./controllers/consulta.js')
const login = require('./controllers/login.js');
const adocao = require('./controllers/adocao.js')

routes.get('/', (req, res) => {
    res.json({ message: 'Rota funcionando!' });
});


routes.post('/u', User.create);
routes.get('/u', User.read);
routes.get('/u/:id', User.readOne);
routes.put('/u/:id', User.update);
routes.delete('/u/:id', User.remove);

routes.post('/c', Consulta.create);
routes.get('/c', Consulta.read);
routes.get('/c/:id', Consulta.readOne);
routes.put('/c/:id', Consulta.update);
routes.delete('/c/:id', Consulta.remove);

routes.post('/l', login.create);
routes.get('/l', login.read);
routes.get('/l/:id', login.readOne);
routes.put('/l/:id', login.update);
routes.delete('/l/:id', login.remove);

routes.post('/a',adocao.create);
routes.get('/a', adocao.read);
routes.get('/a/:id',adocao.readOne);
routes.put('/a/:id',adocao.update);
routes.delete('/a/:id',adocao.remove);


module.exports = routes;
