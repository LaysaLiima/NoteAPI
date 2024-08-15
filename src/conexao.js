const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect('mongodb+srv://root:root@meuclusterdenotas.64p5s4f.mongodb.net/');
        console.log("Conectado ao MongoDB");
    } catch (err) {
        console.error("Erro ao conectar ao MongoDB", err);
        process.exit(1);
    }
};

module.exports = connection;