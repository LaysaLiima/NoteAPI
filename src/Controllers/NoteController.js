const Nota = require('../Models/Note.js');
const axios = require('axios');
const mongoose = require('mongoose');
const geoip = require('geoip-lite');

const obterLocalizacaoPorIp = async (req, res) => {
  let ip;

  try {
    if (true) {
      const response = await axios.get('https://api.ipify.org?format=json');
      ip = response.data.ip;

      if (!ip) {
        return res.status(400).json({ erro: "Não foi possível obter o IP público da máquina" });
      }
    } else {
      ip = req.ip;
    }

    const geo = geoip.lookup(ip);

    if (geo) {
      return res.status(200).json({
        country: geo.country || 'Não disponível',
        region: geo.region || 'Não disponível',
        city: geo.city || 'Não disponível'
      });
    } else {
      return res.status(404).json({ erro: 'Localização não encontrada para o IP fornecido.' });
    }
  } catch (error) {
    return res.status(500).json({ erro: `Erro ao obter dados: ${error.message}` });
  }
};

const listarAnotacoes = async (req, res) => {
  try {
    const anotacoes = await Nota.find();

    if (anotacoes.length === 0) {
      return res.status(404).json("Não existem anotações cadastradas");
    }

    return res.status(200).json(anotacoes);
  } catch (error) {
    console.error(`Erro ao listar anotações: ${error.message}`);
    return res.status(500).json("Erro interno do servidor");
  }
};

const obterUmaNota = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json("ID inválido");
  }

  try {
    const nota = await Nota.findById(id);

    if (!nota) {
      return res.status(404).json("Anotação não encontrada");
    }

    return res.status(200).json(nota);
  } catch (error) {
    console.error(`Erro ao obter anotação: ${error.message}`);
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
    console.error(`Erro ao cadastrar anotação: ${error.message}`);
    return res.status(500).json("Erro interno do servidor");
  }
};

const atualizarUmaNota = async (req, res) => {
  const { id } = req.params;
  const { titulo, conteudo } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json("ID inválido");
  }

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
    console.error(`Erro ao atualizar anotação: ${error.message}`);
    return res.status(500).json("Erro interno do servidor");
  }
};

const deletarUmaNota = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json("ID inválido");
  }

  try {
    const nota = await Nota.findById(id);

    if (!nota) {
      return res.status(404).json("Anotação não encontrada");
    }

    await Nota.findByIdAndDelete(id);
    return res.status(200).json("Anotação deletada");
  } catch (error) {
    console.error(`Erro ao deletar anotação: ${error.message}`);
    return res.status(500).json("Erro interno do servidor");
  }
};

module.exports = {
  listarAnotacoes,
  obterUmaNota,
  cadastrarNota,
  atualizarUmaNota,
  deletarUmaNota,
  obterLocalizacaoPorIp
};