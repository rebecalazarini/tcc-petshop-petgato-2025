const express = require('express');
const router = express.Router();

let clients = [];

router.post('/client', (req, res) => {
  const { name, email, phone } = req.body;
  const newClient = { id: clients.length + 1, name, email, phone };
  clients.push(newClient);
  res.status(201).json(newClient);
});

router.get('/clients', (req, res) => {
  res.status(200).json(clients);
});

router.get('/client/:id', (req, res) => {
  const client = clients.find(c => c.id === parseInt(req.params.id));
  if (!client) return res.status(404).send('Client not found');
  res.status(200).json(client);
});

module.exports = router;
