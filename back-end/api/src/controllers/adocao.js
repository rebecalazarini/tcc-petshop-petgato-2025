const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
  const { nomepet, especie, raca, nomeproprietario, datanascpet, email, alergia } = req.body;

  try {
    const novaAdocao = await prisma.adocao.create({
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
    res.status(201).json(novaAdocao);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar adoção' });
  }
};

const read = async (req, res) => {
  try {
    const adocoes = await prisma.adocao.findMany(); 
    res.status(200).json(adocoes);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar as adoções' });
  }
};

const readOne = async (req, res) => {
  const { id } = req.params;

  try {
    const adocao = await prisma.adocao.findUnique({
      where: { id: parseInt(id) },
    });

    if (!adocao) {
      return res.status(404).json({ message: 'Adoção não encontrada' });
    }

    res.status(200).json(adocao); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar a adoção por ID' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { nomepet, especie, raca, nomeproprietario, datanascpet, email, alergia } = req.body;

  try {
    const adocaoAtualizada = await prisma.adocao.update({
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

    res.status(200).json(adocaoAtualizada); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar a adoção' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const adocaoDeletada = await prisma.adocao.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Adoção deletada com sucesso', adocao: adocaoDeletada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar a adoção' });
  }
};

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

module.exports = {
  create,
  read,
  readOne,
  update,
  remove,
};




