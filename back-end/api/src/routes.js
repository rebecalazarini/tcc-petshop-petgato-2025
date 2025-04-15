const express = require('express');
const routes = express.Router();

const User = require('./controllers/user.js');

routes.get('/', (req, res) => {
    res.json({ message: 'Rota funcionando!' });
});


routes.post('/u', User.create);
routes.get('/u', User.read);
routes.get('/u/:id', User.readOne);
routes.put('/u/:id', User.update);
routes.delete('/u/:id', User.remove);

module.exports = routes;
