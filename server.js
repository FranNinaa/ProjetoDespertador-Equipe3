import express from 'express';
import routes from './src/routes.js'; 
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3030;


app.use('/', routes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor Despertador iniciado na porta ${PORT}`);
});

export default app; 
