// Carregar as configurações ao abrir a página
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/config');
        const configuracoes = await response.json();

        if (configuracoes && configuracoes.length > 0) {
            const config = configuracoes[0];

            const timeFormatInput = document.querySelector(`input[name="nmTimeFormat"][value="${config.formatoHora}"]`);
            if (timeFormatInput) timeFormatInput.checked = true;

            const temperatureFormatInput = document.querySelector(`input[name="nmTemperatureFormat"][value="${config.escalaTemp}"]`);
            if (temperatureFormatInput) temperatureFormatInput.checked = true;

            const cityInput = document.getElementById('idCity');
            if (cityInput) cityInput.value = config.cidade;

            const mrOrMrsInput = document.querySelector(`input[name="nmMrOrMrs"][value="${config.sexo === 'M' ? 'idMr' : 'idMrs'}"]`);
            if (mrOrMrsInput) mrOrMrsInput.checked = true;

            const nameInput = document.getElementById('idName');
            if (nameInput) nameInput.value = config.nome;
        }
    } catch (error) {
        console.error('Falha ao carregar configurações', error);
    }
});

// Enviar novas configurações ao submeter o formulário
const form = document.getElementById('configForm');
const statusMessage = document.getElementById('statusMessage');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    console.log("Evento de submit acionado"); 

    const formatoHora = document.querySelector('input[name="nmTimeFormat"]:checked').value;
    const escalaTemp = document.querySelector('input[name="nmTemperatureFormat"]:checked').value;
    const cidade = document.getElementById('idCity').value;
    const sexo = document.querySelector('input[name="nmMrOrMrs"]:checked').value;
    const nome = document.getElementById('idName').value;

    console.log("Valores capturados:", formatoHora, escalaTemp, cidade, sexo, nome); // Verificar os valores capturados


    // Construindo a URL com query parameters
    const url = `/config?formatoHora=${encodeURIComponent(formatoHora)}&escalaTemp=${encodeURIComponent(escalaTemp)}&cidade=${encodeURIComponent(cidade)}&sexo=${encodeURIComponent(sexo)}&nome=${encodeURIComponent(nome)}`;

        console.log("URL construída:", url);

        // Redirecionando para a URL
        window.location.href = url;

    try {
        const response = await fetch('/config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        statusMessage.innerText = 'Configuração salva com sucesso!';

        if (result.status === 0) {
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Erro ao enviar configuração', error);
        statusMessage.innerText = 'Erro ao salvar configuração.';
    }
});