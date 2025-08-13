const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET = process.env.JWT_SECRET || 'meu_segredo_jwt';

const create = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoLogin = await prisma.login.create({
      data: {
        email,
        senha: senhaHash,
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

const autenticar = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await prisma.login.findUnique({
      where: { email },
    });

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login realizado com sucesso', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao autenticar o login' });
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
  update,
  remove,
  autenticar
};







