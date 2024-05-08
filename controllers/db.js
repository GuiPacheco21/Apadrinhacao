//Modulo express
const express = require('express');
const mysql = require('mysql2');

//App
const app = express();

const conexao = mysql.createConnection({
    host: 'apadrinhacao.mysql.database.azure.com',
    user: 'guilherme',
    password: 's!apadrinhacao2024*',
    database: 'apadrinhacaobd',
    ssl: {
        // Aqui você pode especificar outras opções de SSL, se necessário
      }
});

module.exports = conexao;

//teste de conexão
conexao.connect(function(erro){
    if(erro) throw erro;
    console.log('Conexão efetuada com sucesso');
});


