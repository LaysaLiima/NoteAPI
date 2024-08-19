const mongoose = require('mongoose');

const notaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    conteudo: { type: String, required: true },
    datCriacao: {type: Date, default: Date.now}
});

const Nota = mongoose.model('Nota', notaSchema);

module.exports = Nota;