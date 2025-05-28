
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
  const { nomePet, especiePet, racaPet, nomeproprietario, nascpet, emailProprietario, dados } = req.body;

  
  try {
    const novaConsulta = await prisma.consulta.create({
      data: {
        nomePet,
        especiePet,
        racaPet,
        nomeproprietario,
        nascpet: new Date(nascpet), 
        emailProprietario,
        dados,
      },
    });
    res.status(201).json(novaConsulta);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar consulta' });
  }
};


const read = async (req, res) => {
  try {
    const pets = await prisma.consulta.findMany(); 
    res.status(200).json(pets);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao consultar os pets' });
  }
};


const readOne = async (req, res) => {
  const { id } = req.params;

  try {
    const pet = await prisma.consulta.findUnique({
      where: { id: parseInt(id) },
    });

    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado' });
    }

    res.status(200).json(pet); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao consultar o pet por ID' });
  }
};


const update = async (req, res) => {
  const { id } = req.params;
  const { nomePet, especiePet, racaPet, nomeproprietario, nascpet, emailProprietario, dados } = req.body;

  try {
    const petAtualizado = await prisma.consulta.update({
      where: { id: parseInt(id) },
      data: {
        nomePet,
        especiePet,
        racaPet,
        nomeproprietario,
        nascpet: new Date(nascpet),
        emailProprietario,
        dados,
      },
    });

    res.status(200).json(petAtualizado); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o pet' });
  }
};

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
