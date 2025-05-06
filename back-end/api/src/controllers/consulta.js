// src/controllers/consulta.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para criar uma nova consulta (pet)
const create = async (req, res) => {
  const { nomepet, especie, raca, nomeproprietario, datanascpet, email, alergia } = req.body;

  try {
    const novaConsulta = await prisma.consulta.create({
      data: {
        nomepet,
        especie,
        raca,
        nomeproprietario,
        datanascpet: new Date(datanascpet), // Certificando-se de formatar a data corretamente
        email,
        alergia,
      },
    });
    res.status(201).json(novaConsulta);  // Retorna o pet criado
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar consulta' });
  }
};

// Função para buscar todas as consultas (pets)
const read = async (req, res) => {
  try {
    const pets = await prisma.consulta.findMany(); // Busca todos os pets
    res.status(200).json(pets);  // Retorna os pets encontrados
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao consultar os pets' });
  }
};

// Função para buscar um pet específico pelo ID
const readOne = async (req, res) => {
  const { id } = req.params;

  try {
    const pet = await prisma.consulta.findUnique({
      where: { id: parseInt(id) },
    });

    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado' });
    }

    res.status(200).json(pet);  // Retorna o pet encontrado
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao consultar o pet por ID' });
  }
};

// Função para atualizar uma consulta (pet)
const update = async (req, res) => {
  const { id } = req.params;
  const { nomepet, especie, raca, nomeproprietario, datanascpet, email, alergia } = req.body;

  try {
    const petAtualizado = await prisma.consulta.update({
      where: { id: parseInt(id) },
      data: {
        nomepet,
        especie,
        raca,
        nomeproprietario,
        datanascpet: new Date(datanascpet),
        email,
        alergia,
      },
    });

    res.status(200).json(petAtualizado);  // Retorna o pet atualizado
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o pet' });
  }
};

// Função para deletar uma consulta (pet)
const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const petDeletado = await prisma.consulta.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Pet deletado com sucesso', pet: petDeletado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar o pet' });
  }
};

module.exports = {
  create,
  read,
  readOne,
  update,
  remove,
};
