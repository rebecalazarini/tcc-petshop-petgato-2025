const Funcionario = require('../models/Funcionario');

exports.createFuncionario = async (req, res) => {
    try {
        const { nome, cargo, telefone, email, data_nascimento } = req.body;
        const novoFuncionario = new Funcionario({
            nome,
            cargo,
            telefone,
            email,
            data_nascimento
        });

        await novoFuncionario.save();
        res.status(201).json(novoFuncionario);
    } catch (err) {
        res.status(400).json({ message: 'Erro ao criar funcionário', error: err });
    }
};

// Obter todos os funcionários
exports.getAllFuncionarios = async (req, res) => {
    try {
        const funcionarios = await Funcionario.find();
        res.status(200).json(funcionarios);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar funcionários', error: err });
    }
};

exports.getFuncionarioById = async (req, res) => {
    try {
        const funcionario = await Funcionario.findById(req.params.id);
        if (!funcionario) {
            return res.status(404).json({ message: 'Funcionário não encontrado' });
        }
        res.status(200).json(funcionario);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar funcionário', error: err });
    }
};

exports.updateFuncionario = async (req, res) => {
    try {
        const { nome, cargo, telefone, email, data_nascimento } = req.body;
        const funcionario = await Funcionario.findByIdAndUpdate(
            req.params.id,
            { nome, cargo, telefone, email, data_nascimento },
            { new: true }
        );
        if (!funcionario) {
            return res.status(404).json({ message: 'Funcionário não encontrado' });
        }
        res.status(200).json(funcionario);
    } catch (err) {
        res.status(400).json({ message: 'Erro ao atualizar funcionário', error: err });
    }
};

exports.deleteFuncionario = async (req, res) => {
    try {
        const funcionario = await Funcionario.findByIdAndDelete(req.params.id);
        if (!funcionario) {
            return res.status(404).json({ message: 'Funcionário não encontrado' });
        }
        res.status(200).json({ message: 'Funcionário excluído com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao excluir funcionário', error: err });
    }
};
