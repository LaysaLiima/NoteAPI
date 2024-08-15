const express = require('express');
const rotas = require('./rotas.js');
const connection = require('./conexao.js');

const app = express();

app.use(express.json());
app.use(rotas);

const iniciarServer = async () => {
  await connection();
  app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
  });
};

iniciarServer();