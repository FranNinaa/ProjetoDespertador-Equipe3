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
            const headers = 'isAtivo,hora,isAm,descricao\n';
            fs.writeFileSync(this.filePath, headers, 'utf8');
        }
    }

    saveAlarm(alarmData) {
        const dataToSave = `${alarmData.isAtivo},${alarmData.hora},${alarmData.isAm},${alarmData.descricao}\n`;
        fs.appendFileSync(this.filePath, dataToSave, 'utf8');
    }
}

export default new AlarmRepository();
