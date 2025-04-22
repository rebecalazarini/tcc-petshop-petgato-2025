const express = require('express');
const router = express.Router();

let pets = [];

router.post('/pet', (req, res) => {
  const { name, breed, age, ownerId } = req.body;
  const newPet = { id: pets.length + 1, name, breed, age, ownerId };
  pets.push(newPet);
  res.status(201).json(newPet);
});

router.get('/pets', (req, res) => {
  res.status(200).json(pets);
});

router.get('/pet/:id', (req, res) => {
  const pet = pets.find(p => p.id === parseInt(req.params.id));
  if (!pet) return res.status(404).send('Pet not found');
  res.status(200).json(pet);
});

module.exports = router;
