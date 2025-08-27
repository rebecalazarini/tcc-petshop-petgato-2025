const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const SECRET_KEY = process.env.SECRET_KEY || 'meu_segredo_jwt';


const create = async (req, res) => {
    try {
        const {email, password} = req.body;
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ error: 'Email ja existente.' });
        }
        const salt = await bcrypt.genSalt(10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            }
        });
        const token = jwt.sign(
            {id:user.id, email: user.email},
            SECRET_KEY,
            {expiresIn: '1h'}
        );
        return res.status(201).json({ message: 'Usuário criado com sucesso!', token });
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
