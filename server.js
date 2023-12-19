// server.js
import express from 'express';
import routes from './src/routes.js'; // Importe as rotas do arquivo routes.js

const app = express();
const PORT = process.env.PORT || 3030;

// Use as rotas no aplicativo
app.use('/', routes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor Despertador iniciado na porta ${PORT}`);
});

export default app; // Exporte o aplicativo para uso em outros arquivos
