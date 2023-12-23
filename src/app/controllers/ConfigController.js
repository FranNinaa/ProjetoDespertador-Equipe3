import ConfigRepository from '../repositories/ConfigRepository.js';

class ConfigController {
  async getConfig(req, res) {
    try {
      // Chame o método listarConfiguracoes em vez de getConfig
      const configuracoes = await ConfigRepository.listarConfiguracoes();
      res.status(200).json(configuracoes);
    } catch (erro) {
      res.status(500).json({ 'erro': erro.message });
    }
  }

  
}

export default new ConfigController();
