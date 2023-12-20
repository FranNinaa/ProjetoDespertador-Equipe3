import fetch from 'node-fetch';

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


    getConfig() {
        // Adquira o nome do usuário do cadastro do sistema.
        // Substitua isso com a lógica real de obtenção da configuração.
        const userName = "Mr. Hendrik"; // Exemplo fictício do nome do usuário.
        return userName;
    }

    //esta cometado pois  a api nao esta retornando o nascer do sol da null
    //async getSunrise() {
    //   try {
    //        const res = await fetch(' https://hgbrasil.com/status/weather');
    //        const data = await res.json();
    //         return data.results.sunrise;
    //    } catch (error) {
    //       console.error('Erro ao obter o nascer do sol:', error);
    //       return null;
    //   }
    // }

   
    async getMensagem() {
        const name = this.getConfig();
        const sunsetTime = await this.getClima('São Paulo'); // Substitua 'cidade' pela cidade desejada
        const currentTime = new Date();
        const hour = currentTime.getHours();
        const minute = currentTime.getMinutes();
        let formattedHour = hour < 10 ? `0${hour}` : hour;
        let formattedMinute = minute < 10 ? `0${minute}` : minute;

        let greeting, timeFormat, hourStand, message;

        if (hour >= 0 && hour < 12) {
            greeting = "Good Morning";
            timeFormat = "AM";
            hourStand = hour === 0 ? "Midnight" : `${formattedHour}:${formattedMinute}`;
        } else if (hour >= 12 && hour < sunsetTime - 4) {
            greeting = "Good Afternoon";
            timeFormat = "PM";
            formattedHour -= 12; // Ajuste para o formato de 12 horas
            hourStand = hour === 12 ? "Noon" : `${formattedHour}:${formattedMinute}`;
        } else if (hour >= sunsetTime - 4 && hour < sunsetTime) {
            greeting = "Good Evening";
            timeFormat = "PM";
            hourStand = `${formattedHour}:${formattedMinute}`;
        } else {
            greeting = "Good Night";
            timeFormat = "PM";
            formattedHour -= 12; // Ajuste para o formato de 12 horas
            hourStand = hour === 0 ? "Midnight" : `${formattedHour}:${formattedMinute}`;
            // const tomorrowSunrise = await this.getSunrise();
            //message = `tomorrow the sun will rise at ${tomorrowSunrise}`;
        }

        message = `${greeting}, ${name}. It's ${hourStand} ${timeFormat}.`;

        return { msn: message };
    }
}


export default MensagemRepository;
