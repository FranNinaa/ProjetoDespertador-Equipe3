import ConfigRepository from '../repositories/ConfigRepository.js';

class ConfigController {
  async getConfig(req, res) {
    try {
      const configuracoes = await ConfigRepository.listarConfiguracoes();
      res.status(200).json(configuracoes);
    } catch (erro) {
      res.status(500).json({ 'erro': erro.message });
    }
  }

  async postConfig(req, res) {
    const {formatoHora, escalaTemp, cidade, sexo, nome} = req.body;

    //validação dos campos
    if(!formatoHora) return res.status(400).json({satus:1, mensagem: "O campo Formato Hora não é informado"});
    if(!escalaTemp) return res.status(400).json({satus:1, mensagem: "O campo Escala Temperatura não é informado"});
    if(!cidade) return res.status(400).json({satus:1, mensagem: "O campo Cidade não informado"});
    if(!sexo) return res.status(400).json({satus:1, mensagem: "O campo Sexo não é informado"});
    if(!nome) return res.status(400).json({satus:1, mensagem: "O campo Nome não é informado"});

    try {
      await ConfigRepository.adicionarConfiguracao({ formatoHora, escalaTemp, cidade, sexo, nome });
      res.status(200).json({ 
        status: 0, 
        mensagem: "Configuração salva com sucesso!",
        value: { formatoHora, escalaTemp, cidade, sexo, nome }
    });
    } catch (error) {
        res.status(500).json({ status: 2, mensagem: error.message });
    }
  }
}

export default new ConfigController();
