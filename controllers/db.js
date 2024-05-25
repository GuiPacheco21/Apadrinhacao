//Modulo express
const express = require('express');
const mysql = require('mysql2');

//App
const app = express();

const conexao = mysql.createConnection({
    host: 'privatelink.mysql.database.azure.com',
    user: 'gpacheco1150',
    password: 'hVD1hnVU0yIjyvJZP0jfVuscp3qNZTbZ',
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


