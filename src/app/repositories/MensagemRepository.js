import fetch from 'node-fetch';
import ConfigRepository from './ConfigRepository.js';


class MensagemRepository {
    async getClima(cidade) {
        try {
            const res = await fetch(`https://api.hgbrasil.com/weather?key=${process.env.HG_API_KEY}&city_name=${cidade}`);
            const data = await res.json();
            return data.results.sunset; 
        } catch (error) {
            console.error('Erro ao obter o clima:', error);
            return null;
        }
    }



    async getConfig() {
        return ConfigRepository.getConfig();
    }

    async getMensagem() {
        const config = await this.getConfig();
        const name = config ? config.nome : 'Usuário'; // Extrai o nome da configuração

        const sunsetTime = await this.getClima('São Paulo'); 
        const currentTime = new Date();
        const hour = currentTime.getHours();
        const minute = currentTime.getMinutes();
        let formattedHour = hour < 10 ? `0${hour}` : hour;
        let formattedMinute = minute < 10 ? `0${minute}` : minute;

        let greeting, timeFormat, hourStand, message;

        // Cálculo das saudações baseado na hora do dia
        if (hour >= 0 && hour < 12) {
            greeting = "Good Morning";
            timeFormat = "AM";
            hourStand = hour === 0 ? "Midnight" : `${formattedHour}:${formattedMinute}`;
        } else if (hour >= 12 && hour < sunsetTime - 4) {
            greeting = "Good Afternoon";
            timeFormat = "PM";
            formattedHour = formattedHour > 12 ? formattedHour - 12 : formattedHour;
            hourStand = hour === 12 ? "Noon" : `${formattedHour}:${formattedMinute}`;
        } else if (hour >= sunsetTime - 4 && hour < sunsetTime) {
            greeting = "Good Evening";
            timeFormat = "PM";
            hourStand = `${formattedHour}:${formattedMinute}`;
        } else {
            greeting = "Good Night";
            timeFormat = "PM";
            formattedHour = formattedHour > 12 ? formattedHour - 12 : formattedHour;
            hourStand = hour === 0 ? "Midnight" : `${formattedHour}:${formattedMinute}`;
        }

        message = `${greeting}, ${name}. It's ${hourStand} ${timeFormat}.`;

        return { msn: message };
    }
}

export default MensagemRepository;