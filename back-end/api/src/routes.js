const express = require('express');
const routes = express.Router();

const User = require('./controllers/user.js');
const Consulta = require('./controllers/consulta.js')

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


module.exports = routes;
