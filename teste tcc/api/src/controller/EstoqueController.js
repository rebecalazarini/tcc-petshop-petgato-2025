const express = require('express');
const router = express.Router();

let stock = [];

router.post('/product', (req, res) => {
  const { name, quantity, price } = req.body;
  const newProduct = { id: stock.length + 1, name, quantity, price };
  stock.push(newProduct);
  res.status(201).json(newProduct);
});

router.get('/stock', (req, res) => {
  res.status(200).json(stock);
});

router.get('/product/:id', (req, res) => {
  const product = stock.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');
  res.status(200).json(product);
});

module.exports = router;
