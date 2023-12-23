import express from 'express';
import cors from 'cors';
import routes from './src/routes.js';
import 'dotenv/config';
import conexao from './src/app/database/conexao.js';

// Inicialize o app com express
const app = express();

// Use o middleware CORS
app.use(cors());

// Middleware para analisar JSON no corpo da requisição
app.use(express.json());

// Defina as rotas
app.use('/', routes);

// Checar conexão com o banco de dados
conexao.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados: ' + err.message);
    return;
  }
  console.log('Conectado ao banco de dados com sucesso!');
  connection.release(); // Libera a conexão de volta ao pool
});

// Defina a porta e inicie o servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor Despertador iniciado na porta ${PORT}`);
});
