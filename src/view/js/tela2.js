// Função para converter Celsius para Fahrenheit ou Kelvin e retornar uma string formatada
function convertTemperature(celsius, scale) {
    let convertedTemp;
    let unit;

    // Utiliza uma estrutura switch para lidar com diferentes escalas de temperatura
    switch (scale) {
        case 'idFahrenheit':
            // Converte Celsius para Fahrenheit
            convertedTemp = (celsius * 9 / 5) + 32;
            unit = 'ºF';
            break;
        case 'idKelvin':
            // Converte Celsius para Kelvin
            convertedTemp = celsius + 273.15;
            unit = 'ºK';
            break;
        default:
            // Mantém a temperatura em Celsius se nenhum outro caso for correspondido
            convertedTemp = celsius;
            unit = 'ºC';
    }

    // Retorna a temperatura convertida formatada como string
    return `${convertedTemp.toFixed(2)} ${unit}`;
}

// Função para atualizar as configurações no servidor
async function updateConfig() {
    // Coleta os valores dos inputs do formulário
    const formatoHora = document.querySelector('input[name="nmTimeFormat"]:checked').value;
    const escalaTemp = document.querySelector('input[name="nmTemperatureFormat"]:checked').value;
    const cidade = document.getElementById('idCity').value;
    const sexo = document.querySelector('input[name="nmMrOrMrs"]:checked').value;
    const nome = document.getElementById('idName').value;
    const newConfig = { formatoHora, escalaTemp, cidade, sexo, nome };

    try {
        // Envia os dados atualizados para o servidor
        await fetch('/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newConfig)
        });
        // Atualiza a mensagem de status
        statusMessage.innerText = 'Configuração atualizada com sucesso!';
    } catch (error) {
        // Captura e exibe erros caso ocorram
        console.error('Erro ao atualizar configuração', error);
        statusMessage.innerText = 'Erro ao atualizar configuração.';
    }
}

// Carregar configurações e adicionar listeners quando a página for carregada
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Faz uma requisição para obter as configurações atuais
        const response = await fetch('/config');
        const configuracoes = await response.json();

        // Se configurações foram recebidas, preenche os campos do formulário
        if (configuracoes && configuracoes.length > 0) {
            const config = configuracoes[0];

            // Preenche os campos de cidade e nome
            document.getElementById('idCity').value = config.cidade;
            document.getElementById('idName').value = config.nome;

            // Determina e marca o botão de rádio de gênero apropriado
            let genderInputId;
            if (config.sexo === 'M') {
                genderInputId = 'idMr';
            } else if (config.sexo === 'F') {
                genderInputId = 'idMrs';
            }

            if (genderInputId) {
                document.getElementById(genderInputId).checked = true;
            }

            // Marca a opção de escala de temperatura
            const temperatureInputId = config.escalaTemp;
            if (temperatureInputId) {
                document.querySelector(`input[name="nmTemperatureFormat"][value="${temperatureInputId}"]`).checked = true;
            }

            // Dispara o evento 'change' para o formato de hora
            const timeFormatInput = document.querySelector('input[name="nmTimeFormat"]:checked');
            if (timeFormatInput) {
                timeFormatInput.dispatchEvent(new Event('change'));
            }
        }
    } catch (error) {
        // Captura e exibe erros caso ocorram
        console.error('Falha ao carregar configurações', error);
    }

    // Adiciona um event listener 'change' a todos os inputs para atualizar as configurações
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', updateConfig);
    });
});
