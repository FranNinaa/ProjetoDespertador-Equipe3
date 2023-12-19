import DateTimeRepository from "../repositories/DateTimeRepository.js";

class DateTimeController {
    //Retorna a hora atual
    show(req, res) {
        try {
            const horaCerta =  DateTimeRepository.getTime();
            res.status(200).json({ horaCerta: horaCerta });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao obter a hora atual." });
        }
    }
}
export default new DateTimeController