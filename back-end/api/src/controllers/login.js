
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || 'meu_segredo_jwt';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: 'Email ou senha incorretos.' });
        } 
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Email ou senha incorretos.' });
        }
        const payload = {
            id: user.id,
            email: user.email,
        };

        //Gera o token JWT com a chave secreta e tempo de expiração
        const token = jwt.sign(
            payload,
            SECRET_KEY,
            { expiresIn: '1h' } // Token expira em 1 hora
        );
        return res.json({ message: 'Login bem-sucedido!', token });

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        
        req.user = user;
        next();
    });
};

module.exports = {
    login,
    authenticateToken
};