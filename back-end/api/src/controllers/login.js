const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
  const { nome, email, senha } = req.body; 

  try {
    const novoLogin = await prisma.login.create({
      data: {
        nome,
        email,
        senha,
      },
    });
    res.status(201).json(novoLogin);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar login' });
  }
};

const read = async (req, res) => {
  try {
    const logins = await prisma.login.findMany(); 
    res.status(200).json(logins);  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar os logins' });
  }
};

const readOne = async (req, res) => {
  const { id } = req.params;

  try {
    const login = await prisma.login.findUnique({
      where: { id: parseInt(id) },
    });

    if (!login) {
      return res.status(404).json({ message: 'Login não encontrado' });
    }

    res.status(200).json(login); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar o login por ID' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body; 

  try {
    const loginAtualizado = await prisma.login.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        email,
        senha, 
      },
    });

    res.status(200).json(loginAtualizado); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o login' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const loginDeletado = await prisma.login.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Login deletado com sucesso', login: loginDeletado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar o login' });
  }
};

module.exports = {
  create,
  read,
  readOne,
  update,
  remove,
};
