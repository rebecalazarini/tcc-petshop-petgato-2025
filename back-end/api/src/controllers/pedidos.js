// src/controllers/pedidos.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Criar pedido
const create = async (req, res) => {
  const { usuarioId, enderecoCliente, produtoId, quantidade, total } = req.body;

  // Verificar se todos os campos necessários estão presentes
  if (!usuarioId || !enderecoCliente || !produtoId || !quantidade || !total) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    // Verificar se o usuarioId existe na tabela Login (usuarioId é o email do Login)
    console.log("Verificando usuário:", usuarioId);  // Verificar se o valor está correto

    const usuarioExistente = await prisma.login.findUnique({
      where: { email: usuarioId },
    });

    // Se o usuário não for encontrado
    if (!usuarioExistente) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Criar o pedido se o usuário existir
    const pedido = await prisma.pedido.create({
      data: {
        usuarioId,
        enderecoCliente,
        produtoId,
        quantidade,
        total,
      },
    });

    // Retornar o pedido criado com sucesso
    res.status(201).json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
};





// Ler todos os pedidos
const read = async (req, res) => {
  try {
    const pedidos = await prisma.pedido.findMany();
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar pedidos" });
  }
};

// Ler pedido por ID
const readById = async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await prisma.pedido.findUnique({
      where: { id: parseInt(id) },
    });

    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    res.json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar pedido" });
  }
};

// Atualizar pedido
const update = async (req, res) => {
  const { id } = req.params;
  const { usuarioId, enderecoCliente, produtoId, quantidade, total } = req.body;

  try {
    const pedido = await prisma.pedido.update({
      where: { id: parseInt(id) },
      data: {
        usuarioId,
        enderecoCliente,
        produtoId,
        quantidade,
        total,
      },
    });

    res.json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar pedido" });
  }
};

// Remover pedido
const remove = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.pedido.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send(); // Pedido deletado com sucesso
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar pedido" });
  }
};

module.exports = {
  create,
  read,
  readById,
  update,
  remove,
};
