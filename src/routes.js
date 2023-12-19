import { Router } from "express"
import DateTimeController from "./app/controllers/DateTimeController.js"
import WeatherController from "./app/controllers/WeatherController.js"

const router = Router();

// Rota inicial
router.get('/', (req, res) => {
  res.send('Bem-vindo ao Projeto Despertador!');
});

// Rota para obter a hora atual
router.get("/horaCerta", DateTimeController.showTime)

//  Rota para obter a data atual
router.get("/hoje", DateTimeController.showDate);

// Rota para obter o clima de uma cidade
router.get("/clima", WeatherController.getClima);

export default router; 
