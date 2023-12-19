import DateTimeRepository from "../repositories/DateTimeRepository.js";

//Retorna a hora atual
class DateTimeController {
    showTime(req, res) {
        try {
            const horaCerta =  DateTimeRepository.getTime();
            res.status(200).json({ horaCerta: horaCerta });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao obter a hora atual." });
        }
     
    }
    //Retorna a data atual
    showDate(req, res) {
        try {
            const dataCerta =  DateTimeRepository.getDate(req);
            res.status(200).json({ dataCerta: dataCerta });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao obter a data atual." });
        }
    }
}
export default new DateTimeController