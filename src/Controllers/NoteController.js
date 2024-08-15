const Nota = require('../Models/Note.js');

const listarAnotacoes = async (req, res) => {
  try {
    const anotacoes = await Nota.find();

    if (anotacoes.length === 0) {
      return res.status(404).json("Não existem anotações cadastradas");
    }

    return res.status(200).json(anotacoes);
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};

const obterUmaNota = async (req, res) => {
  const { id } = req.params;

  try {
    const nota = await Nota.findById(id);

    if (!nota) {
      return res.status(404).json("Anotação não encontrada");
    }

    return res.status(200).json(nota);
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};

const cadastrarNota = async (req, res) => {
  const { titulo, conteudo } = req.body;

  try {
    const novaNota = new Nota({
      titulo,
      conteudo
    });
    await novaNota.save();
    return res.status(201).json("Anotação cadastrada");
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};

const atualizarUmaNota = async (req, res) => {
  const { id } = req.params;
  const { titulo, conteudo } = req.body;

  try {
    const nota = await Nota.findById(id);

    if (!nota) {
      return res.status(404).json("Anotação não encontrada");
    }

    await Nota.findByIdAndUpdate(id, {
      titulo,
      conteudo
    });
    return res.status(200).json("Anotação atualizada");
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};

const deletarUmaNota = async (req, res) => {
  const { id } = req.params;

  try {
    const nota = await Nota.findById(id);

    if (!nota) {
      return res.status(404).json("Anotação não encontrada");
    }

    await Nota.findByIdAndDelete(id);
    return res.status(200).json("Anotação deletada");
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};

module.exports = {
  listarAnotacoes,
  obterUmaNota,
  cadastrarNota,
  atualizarUmaNota,
  deletarUmaNota
};