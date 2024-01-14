import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AlarmRepository {
    constructor() {
        this.filePath = path.join(__dirname, '..', 'database', 'alarmes.csv');
        this.init();
    }

    init() {
        if (!fs.existsSync(this.filePath)) {
            const headers = 'isAtivo,hora,isAm,descricao,id\n';
            fs.writeFileSync(this.filePath, headers, 'utf8');
        }
    }

    saveAlarm(alarmData) {
        const dataToSave = `\n${alarmData.isAtivo},${alarmData.hora},${alarmData.isAm},${alarmData.descricao},${alarmData.id}`;
        fs.appendFileSync(this.filePath, dataToSave, 'utf8');
    }

    getAllAlarms() {
        const fileContent = fs.readFileSync(this.filePath, 'utf8');
        const lines = fileContent.trim().split('\n');
        const headers = lines[0].split(',');

        // Mapeia cada linha do CSV para um objeto representando um alarme
        const alarms = lines.slice(1).map((line) => {
            const values = line.split(',');
            const alarm = { };
            headers.forEach((header, index) => {
                alarm[header] = values[index];
            });
            return alarm;
        });

        return alarms;
    }
}

export default new AlarmRepository();