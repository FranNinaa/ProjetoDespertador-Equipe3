import { Router } from "express"
import DateTimeController from "./app/controllers/DateTimeController.js"

const router = Router();

// Rota inicial
router.get('/', (req, res) => {
  res.send('Bem-vindo ao Projeto Despertador!');
});

// Rota para obter a hora atual
router.get("/horaCerta", DateTimeController.show)

export default router; // Exporte as rotas para uso em outros arquivos
