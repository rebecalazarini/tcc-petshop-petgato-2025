const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET = process.env.JWT_SECRET || 'meu_segredo_jwt';

const create = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o email já está cadastrado
    const emailExistente = await prisma.login.findUnique({
      where: { email },
    });

    if (emailExistente) {
      return res.status(400).json({ message: 'Email já está em uso.' });
    }

    // Criptografar a senha antes de salvar
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar novo usuário
    const novoLogin = await prisma.login.create({
      data: {
        email,
        senha: senhaHash,
      },
    });

    // Retornar a resposta com o novo login (sem tentar autenticar)
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
    let dadosAtualizados = { nome, email };
    if (senha) {
      dadosAtualizados.senha = await bcrypt.hash(senha, 10);
    }

    const loginAtualizado = await prisma.login.update({
      where: { id: parseInt(id) },
      data: dadosAtualizados,
    });

    res.status(200).json(loginAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o login' });
  }
};

const autenticar = async (req, res) => {
  const { email, senha } = req.body;

  console.log('Email:', email);  // Verifique se o email está correto
  console.log('Senha:', senha);  // Verifique se a senha está correta (não em produção)

  try {
    const usuario = await prisma.login.findUnique({ where: { email } });

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      console.log('Erro: Email ou senha inválidos');
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET, { expiresIn: '1h' });
    console.log('Token gerado:', token);

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
