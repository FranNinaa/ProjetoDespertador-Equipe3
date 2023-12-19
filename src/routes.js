import { Router } from "express"
import DateTimeController from "./app/controllers/DateTimeController.js"

const router = Router();

// Rota inicial
router.get('/', (req, res) => {
  res.send('Bem-vindo ao Projeto Despertador!');
});

// Rota para obter a hora atual
router.get("/horaCerta", DateTimeController.showTime)

//  Rota para obter a data atual
router.get("/hoje", DateTimeController.showDate);

export default router; 
