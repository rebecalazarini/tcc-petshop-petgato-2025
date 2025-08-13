const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Middlewares = require('../middlewares/auth');
// const Email = require('../middlewares/email');

const read = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar users' });
    }
}

const create = async (req, res) => {
    try {
        req.body.senha = await Middlewares.createHash(req.body.senha);
        const user = await prisma.user.create({
            data: req.body
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar user' });
    }
}

const reset = async (req, res) => {
    if (!req.body.email) {
        res.status(400).json({ error: 'Necessário o envio do email' }).end();
    }
    const senha = await Middlewares.createHash("senha000");
    try {
        const users = await prisma.user.findMany({
            where: { email: req.body.email }
        });
        if (!users || users.length === 0) {
            return res.status(400).json({ erro: "Email não encontrado" }).end();
        }
        const user = await prisma.user.update({
            where: { email: req.body.email },
            data: { senha: senha }
        });
        // await Email.enviarEmail(req.body.email, "senha000");
        res.status(202).json({user: user, senhaProvisoria: "senha000"}).end();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar user' });
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    if (req.body.senha) req.body.senha = await Middlewares.createHash(req.body.senha);
    try {
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: req.body
        });
        res.status(202).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar user' });
    }
}

const del = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar user' });
    }
}

module.exports = {
    read,
    create,
    reset,
    update,
    del
};