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

    
}

export default new ConfigRepository();
