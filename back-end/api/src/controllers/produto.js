const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try{
        const {nome, descricao, preco, imagem, }= req.body;
        const produto = await prisma.produto.create({
            data: {
                nome,
                descricao,
                preco,
                imagem,
            },
        });
        res.status(201).json(produto);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
};

const read = async (req, res) => {
    try {
        console.log("Requisição recebida para buscar produtos...");
        const produtos = await prisma.produto.findMany();
        console.log("Produtos encontrados:", produtos);
        res.status(200).json(produtos);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
};


const readById = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await prisma.produto.findUnique({
            where: { id: Number(id) },
        });
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produto' });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, preco, imagem } = req.body;
        const produto = await prisma.produto.update({
            where: { id: Number(id) },
            data: {
                nome,
                descricao,
                preco,
                imagem,
            },
        });
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await prisma.produto.delete({
            where: { id: Number(id) },
        });
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover produto' });
    }
};
module.exports = {
    create,
    read,
    readById,
    update,
    remove,
};