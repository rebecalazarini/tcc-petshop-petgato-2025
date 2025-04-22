const express = require('express');
const router = express.Router();

let sales = [];

router.post('/sale', (req, res) => {
  const { petId, service, price } = req.body;
  const newSale = { id: sales.length + 1, petId, service, price };
  sales.push(newSale);
  res.status(201).json(newSale);
});

router.get('/sales', (req, res) => {
  res.status(200).json(sales);
});

router.get('/sale/:id', (req, res) => {
  const sale = sales.find(s => s.id === parseInt(req.params.id));
  if (!sale) return res.status(404).send('Sale not found');
  res.status(200).json(sale);
});

module.exports = router;
