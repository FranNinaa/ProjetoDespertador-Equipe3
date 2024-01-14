import AlarmRepository from '../repositories/AlarmRepository.js';

export const createAlarm = async (req, res) => {
    try {
        const alarmData = req.body;
        AlarmRepository.saveAlarm(alarmData);
        res.status(201).send('Alarme criado com sucesso!');
    } catch (error) {
        res.status(500).send('Erro ao criar o alarme: ' + error.message);
    }
};

export const getAllAlarms = async (req, res) => {
    try {
        const alarms = AlarmRepository.getAllAlarms();
        res.status(200).json(alarms);
    } catch (error) {
        res.status(500).send('Erro ao obter os alarmes: ' + error.message);
    }
};
