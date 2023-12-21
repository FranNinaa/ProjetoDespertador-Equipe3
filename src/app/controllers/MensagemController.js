import MensagemRepository from '../repositories/MensagemRepository.js';

class MensagemController {
    async getMsn(req, res) {
        try {
            const mensagemRepository = new MensagemRepository();
            const mensagem = await mensagemRepository.getMensagem();
            res.status(200).json({ mensagem: mensagem });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao obter a mensagem.' });
        }
    }
}
export default new MensagemController();
