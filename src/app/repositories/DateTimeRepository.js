class DateTimeRepository {
    getTime() {
        const horaAtual = getHoraCerta(); 
        return this.formatoHora(horaAtual);
    }

    getDate(req) {
        const dataAtual = getHoje(req); 
        return this.formatoData(dataAtual);
    }

    formatoHora({ horas, minutos, segundos }) {
        const formatoHora = this.formatoCerto(horas) + ':' + this.formatoCerto(minutos) + ':' + this.formatoCerto(segundos);
        return formatoHora;
    }

    formatoData(data) {
        return data;
    }

    formatoCerto(numero) {
        return numero.toString().padStart(2, '0');
    }
}

function getHoraCerta() {
    const now = new Date();
    const horas = now.getHours();
    const minutos = now.getMinutes();
    const segundos = now.getSeconds();

    return { horas, minutos, segundos };
}

function getHoje(req) {
    const idiomasAceitos = req.headers["accept-language"];
    const idiomaPreferido = idiomasAceitos ? idiomasAceitos.split(',')[0] : 'pt-BR';
    const agora = new Date();

    const dataFormatada = new Intl.DateTimeFormat(idiomaPreferido, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(agora);

    console.log(typeof dataFormatada);

    return dataFormatada;
}

export default new DateTimeRepository();
