import ConfigRepository from '../repositories/ConfigRepository.js';

class ConfigController {
  // Método para obter as configurações
  async getConfig(req, res) {
    try {
      const configuracoes = await ConfigRepository.listarConfiguracoes();
      res.status(200).json(configuracoes);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }

  // Método para criar uma nova configuração
  async postConfig(req, res) {
    const { formatoHora, escalaTemp, cidade, sexo, nome } = req.body;

    // Validação dos campos
    // Retorna um erro 400 se algum campo não for informado
    if(!formatoHora) return res.status(400).json({ status: 1, mensagem: "O campo Formato Hora não é informado" });
    if(!escalaTemp) return res.status(400).json({ status: 1, mensagem: "O campo Escala Temperatura não é informado" });
    if(!cidade) return res.status(400).json({ status: 1, mensagem: "O campo Cidade não informado" });
    if(!sexo) return res.status(400).json({ status: 1, mensagem: "O campo Sexo não é informado" });
    if(!nome) return res.status(400).json({ status: 1, mensagem: "O campo Nome não é informado" });

    try {
      await ConfigRepository.adicionarConfiguracao({ formatoHora, escalaTemp, cidade, sexo, nome });
      res.status(200).json({ status: 0, mensagem: "Configuração salva com sucesso!", value: { formatoHora, escalaTemp, cidade, sexo, nome } });
    } catch (error) {
      res.status(500).json({ status: 2, mensagem: error.message });
    }
  }

  // Método para atualizar uma configuração existente
  async updateConfig(req, res) {
    const { id, formatoHora, escalaTemp, cidade, sexo, nome } = req.body;

    // Validação dos campos
    // Retorna um erro 400 se algum campo não for informado
    if(!formatoHora) return res.status(400).json({ status: 1, mensagem: "O campo Formato Hora não é informado" });
    if(!escalaTemp) return res.status(400).json({ status: 1, mensagem: "O campo Escala Temperatura não é informado" });
    if(!cidade) return res.status(400).json({ status: 1, mensagem: "O campo Cidade não informado" });
    if(!sexo) return res.status(400).json({ status: 1, mensagem: "O campo Sexo não é informado" });
    if(!nome) return res.status(400).json({ status: 1, mensagem: "O campo Nome não é informado" });

    try {
      await ConfigRepository.atualizarConfiguracao(id, { formatoHora, escalaTemp, cidade, sexo, nome });
      res.status(200).json({ mensagem: "Configuração atualizada com sucesso!" });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  // Método para excluir uma configuração
  async deleteConfig(req, res) {
    const { id } = req.params;

    try {
      await ConfigRepository.excluirConfiguracao(id);
      res.status(200).json({ mensagem: "Configuração excluída com sucesso!" });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
}

export default new ConfigController();
