//Modulo express
const express = require('express');
const mysql = require('mysql2');

//App
const app = express();

const pool = mysql.createPool({
    host: 'apadrinhacaodb.mysql.database.azure.com',
    user: 'gpacheco1150',
    password: 'hVD1hnVU0yIjyvJZP0jfVuscp3qNZTbZ',
    database: 'apadrinhacaobd',
    ssl: {
        // Aqui você pode especificar outras opções de SSL, se necessário
    },
    waitForConnections: true,
    connectionLimit: 10,  // Ajuste conforme necessário
    queueLimit: 0  // Sem limite de fila
});

// Exportar o pool para uso em outros módulos
module.exports = pool;

// Teste de conexão
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conexão efetuada com sucesso');
        connection.release();  // Liberar a conexão de volta para o pool
    }
});

// Exemplo de endpoint que usa o pool de conexões
app.get('/teste', (req, res) => {
    pool.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao executar a consulta' });
        } else {
            res.json({ solution: results[0].solution });
        }
    });
});

// Manter a conexão ativa com keep-alive
setInterval(() => {
    pool.query('SELECT 1', (err, results) => {
        if (err) {
            console.error('Keep-alive query failed:', err);
        }
    });
}, 10000);  // A cada 10 segundos




