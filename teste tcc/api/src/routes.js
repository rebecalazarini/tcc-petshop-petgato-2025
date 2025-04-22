const express = require('express');
const routes = express.Router();

const User = require('./controller/controllers/');

routes.get('/', (req, res) => {
    res.json({ message: 'Rota funcionando!' });
});


routes.post('/u', User.create);
routes.get('/u', User.read);
routes.get('/u/:id', User.readOne);
routes.put('/u/:id', User.update);
routes.delete('/u/:id', User.remove);

const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

router.get('/', funcionarioController.getAllFuncionarios); 
router.post('/', funcionarioController.createFuncionario);
router.get('/:id', funcionarioController.getFuncionarioById);  
router.put('/:id', funcionarioController.updateFuncionario); 
router.delete('/:id', funcionarioController.deleteFuncionario); 

module.exports = router;


module.exports = routes;