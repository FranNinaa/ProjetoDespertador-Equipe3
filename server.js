import express from 'express';
import cors from 'cors';
import routes from './src/routes.js';
import path from 'path';
import 'dotenv/config';
import conexao from './src/app/database/conexao.js';
import { fileURLToPath } from 'url';

// Inicialize o app com express
const app = express();

// Obter o caminho do diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use o middleware CORS
app.use(cors());

// Middleware para analisar JSON no corpo da requisição
app.use(express.json());


// Defina as rotas
app.use('/', routes);

// Servir arquivos estáticos (imagens, CSS, JavaScript do frontend)
app.use(express.static(path.join(__dirname,"/src/view")))


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
