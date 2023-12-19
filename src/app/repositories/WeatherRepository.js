import 'dotenv/config';
import fetch from 'node-fetch';

class WeatherRepository {
  async findByCity(cidade) {
    return getClimaCidadeNome(cidade);
  }
}

export default new WeatherRepository();

async function getClimaCidadeNome(cidade) {
  const res = await fetch(`https://api.hgbrasil.com/weather?key=${process.env.HG_API_KEY}&city_name=${cidade}`);
  const data = await res.json();
  //console.log(data)
 
  return {
   tempMin: data.results.temp_min,
   tempMax: data.results.temp_max,
   tempNow: data.results.temp,
    condition_code: data.results.condition_code,
   sunrise: data.results.sunrise,
  sunset: data.results.sunset
 };

}

