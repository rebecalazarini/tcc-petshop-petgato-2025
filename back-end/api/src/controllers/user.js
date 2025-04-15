const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para criar um user
const create = async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: req.body
        });
        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Função para ler todos os users
const read = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Função para ler um user específico
const readOne = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!user) {
            return res.status(404).json({ error: 'user não encontrado' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Função para atualizar um user
const update = async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: { id: parseInt(req.params.id) },
            data: req.body
        });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Função para remover um user
const remove = async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: { id: parseInt(req.params.id) }
        });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Exporta todas as funções
module.exports = { create, read, readOne, update, remove };
