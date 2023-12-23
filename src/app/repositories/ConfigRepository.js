import conexao from '../database/conexao.js';

class ConfigRepository {
    listarConfiguracoes() {
        const sql = "SELECT * FROM configuracoes";
        return new Promise((resolve, reject) => {
            conexao.query(sql, (erro, resultados) => {
                if (erro) {
                    return reject(erro);
                }
                resolve(resultados);
            });
        });
    }

    adicionarConfiguracao(configData) {
        const sql = "INSERT INTO configuracoes (formatoHora, escalaTemp, cidade, sexo, nome) VALUES (?, ?, ?, ?, ?)";
        return new Promise((resolve, reject) => {
            conexao.query(sql, [configData.formatoHora, configData.escalaTemp, configData.cidade, configData.sexo, configData.nome], (erro, resultados) => {
                if (erro) {
                    return reject(erro);
                }
                resolve(resultados);
            });
        });
    }
}

export default new ConfigRepository();
