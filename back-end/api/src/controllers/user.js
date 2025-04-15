const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para criar um cliente
const create = async (req, res) => {
    try {
        const cliente = await prisma.cliente.create({
            data: req.body
        });
        return res.status(201).json(cliente);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Função para ler todos os clientes
const read = async (req, res) => {
    try {
        const clientes = await prisma.cliente.findMany();
        return res.status(200).json(clientes);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Função para ler um cliente específico
const readOne = async (req, res) => {
    try {
        const cliente = await prisma.cliente.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        return res.status(200).json(cliente);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Função para atualizar um cliente
const update = async (req, res) => {
    try {
        const cliente = await prisma.cliente.update({
            where: { id: parseInt(req.params.id) },
            data: req.body
        });
        return res.status(200).json(cliente);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Função para remover um cliente
const remove = async (req, res) => {
    try {
        const cliente = await prisma.cliente.delete({
            where: { id: parseInt(req.params.id) }
        });
        return res.status(200).json(cliente);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Exporta todas as funções
module.exports = { create, read, readOne, update, remove };
