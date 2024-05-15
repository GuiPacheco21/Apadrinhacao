const express = require('express');
const app = express();
const conexao = require('./controllers/db')





app.set('view engine', 'ejs')

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Rotas para requisições html
app.get('/', (req, res) => {
    res.render('Frontend/index') 
  });
  
  app.get('/adrian', (req, res) => {
    res.render('Frontend/adrian') 
  });
  
  app.get('/bela', (req, res) => {
    res.render('Frontend/bela') 
  });
  
  app.get('/dodo', (req, res) => {
    res.render('Frontend/dodo') 
  });
  
  app.get('/hugo', (req, res) => {
    res.render('Frontend/hugo') 
  });
  
  app.get('/hulk', (req, res) => {
    res.render('Frontend/hulk') 
  });
  
  app.get('/cadastramento', (req, res) => {
    res.render('Frontend/cadastramento') 
  });
  
  app.get('/thor', (req, res) => {
    res.render('Frontend/thor') 
  });
  

  
// Rota POST para inserir dados de usuário
app.post('/cadastrar', (req, res) => {
  const { nome, email, senha } = req.body;

  // Verificar se o email já está cadastrado
  conexao.query('SELECT * FROM usuarios WHERE email = ?', [email], (error, results) => {
      if (error) {
          console.error('Erro ao verificar email:', error);
          res.status(500).send('Erro ao verificar email');
          return;
      }

      // Se já existir um usuário com o mesmo email, retornar um erro
      if (results.length > 0) {
          res.status(400).send('Este email já está cadastrado');
          return;
      }

      // Se o email não estiver cadastrado, proceder com o cadastro
      const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
      conexao.query(query, [nome, email, senha], (error, results) => {
          if (error) {
              console.error('Erro ao cadastrar usuário:', error);
              res.status(500).send('Erro ao cadastrar usuário');
              return;
          }
          console.log('Usuário cadastrado com sucesso');
          // Enviar a resposta com mensagem e script combinados
          res.send('Usuário cadastrado com sucesso<script>alert("Usuário cadastrado com sucesso"); window.location.href = "/";</script>');

          
      });
  });
});


  const port = 8080;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});