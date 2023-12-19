// routes.js
import express from 'express';

const router = express.Router();

// Rota inicial
router.get('/', (req, res) => {
  res.send('Bem-vindo ao Projeto Despertador!');
});

export default router; // Exporte as rotas para uso em outros arquivos
