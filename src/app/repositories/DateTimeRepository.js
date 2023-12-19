class DateTimeRepository {
    getTime() {
        const horaAtual = this.getHoraCerta();
        return this.formatoHora(horaAtual);
    }

    getHoraCerta() {
        const now = new Date();
        const horas = now.getHours();
        const minutos = now.getMinutes();
        const segundos = now.getSeconds();

        return { horas, minutos, segundos };
    }

    formatoHora({ horas, minutos, segundos }) {
        const formatoHora = this.formatoCerto(horas) + ':' + this.formatoCerto(minutos) + ':' + this.formatoCerto(segundos);
        return formatoHora;
    }

    formatoCerto(numero) {
        return numero.toString().padStart(2, '0');
    }
}

export default new DateTimeRepository()
