import conexao from '../database/conexao.js';

class ConfigRepository {

    // Método para listar todas as configurações armazenadas no banco de dados
    listarConfiguracoes() {
        const sql = "SELECT * FROM configuracoes";
        return new Promise((resolve, reject) => {
            // Executa a consulta SQL
            conexao.query(sql, (erro, resultados) => {
                if (erro) {
                    // Rejeita a promessa se houver um erro
                    return reject(erro);
                }
                // Resolve a promessa com os resultados da consulta
                resolve(resultados);
            });
        });
    }

    // Método para adicionar uma nova configuração ao banco de dados
    adicionarConfiguracao(configData) {
        // Consulta SQL para inserir uma nova configuração
        const sql = "INSERT INTO configuracoes (formatoHora, escalaTemp, cidade, sexo, nome) VALUES (?, ?, ?, ?, ?)";
        return new Promise((resolve, reject) => {
            // Executa a consulta SQL com os dados fornecidos
            conexao.query(sql, [configData.formatoHora, configData.escalaTemp, configData.cidade, configData.sexo, configData.nome], (erro, resultados) => {
                if (erro) {
                    // Rejeita a promessa se houver um erro
                    return reject(erro);
                }
                // Resolve a promessa com os resultados da inserção
                resolve(resultados);
            });
        });
    }

    // Método para obter a primeira configuração armazenada
    getConfig() {
        // Consulta SQL para obter a primeira configuração
        const sql = "SELECT * FROM configuracoes LIMIT 1";  
        return new Promise((resolve, reject) => {
            // Executa a consulta SQL
            conexao.query(sql, (erro, resultados) => {
                if (erro) {
                    // Rejeita a promessa se houver um erro
                    return reject(erro);
                }
                // Resolve a promessa com o primeiro resultado ou null se não houver resultados
                resolve(resultados.length > 0 ? resultados[0] : null);
            });
        });
    }

    // Método para atualizar uma configuração existente
    atualizarConfiguracao(id, configData) {
        // Consulta SQL para atualizar uma configuração existente
        const sql = "UPDATE configuracoes SET formatoHora = ?, escalaTemp = ?, cidade = ?, sexo = ?, nome = ? WHERE id = ?";
        return new Promise((resolve, reject) => {
            // Executa a consulta SQL com os dados fornecidos
            conexao.query(sql, [configData.formatoHora, configData.escalaTemp, configData.cidade, configData.sexo, configData.nome, id], (erro) => {
                if (erro) {
                    // Rejeita a promessa se houver um erro
                    return reject(erro);
                }
                // Resolve a promessa sem retorno específico
                resolve();
            });
        });
    }

    // Método para excluir uma configuração existente
    excluirConfiguracao(id) {
        // Consulta SQL para excluir uma configuração
        const sql = "DELETE FROM configuracoes WHERE id = ?";
        return new Promise((resolve, reject) => {
            // Executa a consulta SQL com o ID fornecido
            conexao.query(sql, [id], (erro) => {
                if (erro) {
                    // Rejeita a promessa se houver um erro
                    return reject(erro);
                }
                // Resolve a promessa sem retorno específico
                resolve();
            });
        });
    }
}

export default new ConfigRepository();
