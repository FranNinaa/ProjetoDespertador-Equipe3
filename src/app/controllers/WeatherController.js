import WeatherRepository from "../repositories/WeatherRepository.js";

class WeatherController {
  async getClima(req, res) {
    const cidade = req.query.cidade;

    if (!cidade) {
      res.status(400).json({ error: 'Parâmetro "cidade" não fornecido' });
      return;
    }

    try {
      const weather = await WeatherRepository.findByCity(cidade);
      res.status(200).json(weather);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro em consultar o clima' });
    }
  }
}

export default new WeatherController();