import { Router } from "express"
import path from 'path';
import DateTimeController from "./app/controllers/DateTimeController.js"
import WeatherController from "./app/controllers/WeatherController.js"
import MensagemController from "./app/controllers/MensagemController.js";
import ConfigController from "./app/controllers/ConfigController.js";
import { createAlarm, getAllAlarms } from './app/controllers/AlarmController.js';
import { fileURLToPath } from 'url';

const router = Router();
// Obter o caminho do diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rota inicial
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view/html/alarmTela1.html'));
});

// Rota para obter a hora atual
router.get("/horaCerta", DateTimeController.showTime)

//  Rota para obter a data atual
router.get("/hoje", DateTimeController.showDate);

// Rota para obter o clima de uma cidade
router.get("/clima", WeatherController.getClima);

// Rota para mensagem de boas-vindas conforme o horário
router.get("/msn", MensagemController.getMsn);

router.get('/alarmPage', (req, res) => {
    res.sendFile(path.join(__dirname, 'view/html/alarmTela3.html'));
});

router.get('/newAlarmPage', (req, res) => {
    res.sendFile(path.join(__dirname, 'view/html/alarmTela4.html'));
});

router.get('/todosAlarmes', getAllAlarms);

router.post('/novoAlarme', createAlarm);


router.get('/configPage', (req, res) => {
    res.sendFile(path.join(__dirname, 'view/html/alarmTela2.html'));
});

//Rota Buscar todas as configurações salva no banco de dados
router.get("/config",ConfigController.getConfig);

//Rota para salvar as configurações no banco de dados
router.post('/config', ConfigController.postConfig);

// Rota para atualizar uma configuração
router.put('/config', ConfigController.updateConfig);

// Rota para excluir uma configuração
router.delete('/config/:id', ConfigController.deleteConfig);



export default router; 
