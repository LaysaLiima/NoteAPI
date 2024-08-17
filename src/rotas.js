const express = require('express');
const notes = require('./Controllers/NoteController.js');

const rotas = express();

rotas.get('/notes/location', notes.obterLocalizacaoPorIp); 
rotas.get('/notes', notes.listarAnotacoes); 
rotas.get('/notes/:id', notes.obterUmaNota); 
rotas.post('/notes', notes.cadastrarNota); 
rotas.put('/notes/:id', notes.atualizarUmaNota); 
rotas.delete('/notes/:id', notes.deletarUmaNota);

module.exports = rotas;