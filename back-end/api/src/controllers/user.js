const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const create = async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: req.body
        });
        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json({ error: 'Email ja existente.' });
    }
};

const read = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

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

module.exports = { create, read, update, remove };
