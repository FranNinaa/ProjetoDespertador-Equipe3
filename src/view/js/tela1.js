let diaAtual = new Date().getDate();

function fetchCurrentTime() {
    fetch('/horaCerta')
        .then(response => response.json())
        .then(data => {
            if (data.horaCerta == "00:00:00") {
                fetchDate()
            }
            document.getElementById('current-time').textContent = data.horaCerta;
        })
        .catch(error => console.error('Erro ao buscar a hora atual:', error));

}

function getClima() {
    fetch('/clima?cidade=Blumenau')
        .then(response => response.json())
        .then(data => {
            document.querySelector('.current-temp').textContent = `Now: ${data.tempNow}°C`;
        })
        .catch(error => console.error('Erro ao buscar o clima:', error));
}

let ultimaHoraVerificada = null;

function fetchDate() {
    const hoje = new Date();
    const diaHoje = hoje.getDate();

    fetch('/hoje')
            .then(response => response.json())
            .then(data => {
                document.getElementById('data-atual').textContent = data.dataCerta;
                diaAtual = diaHoje; // Atualiza o dia atual para o novo dia
                console.log(data)
            })
            .catch(error => console.error('Erro ao buscar a data atual:', error));

    // Se mudou para um novo dia, busca a data formatada e atualiza a tela
    if (diaHoje !== diaAtual) {
        fetch('/hoje')
            .then(response => response.json())
            .then(data => {
                document.getElementById('data-atual').textContent = data.dataCerta;
                diaAtual = diaHoje; // Atualiza o dia atual para o novo dia
                console.log(data)
            })
            .catch(error => console.error('Erro ao buscar a data atual:', error));
    }
}

function fetchMensagem() {
        fetch('/msn')
            .then(response => response.json())
            .then(data => {
                const mensagemElement = document.getElementById('mensagem');
                mensagemElement.textContent = data.mensagem.msn;
            })
            .catch(error => console.error('Erro ao buscar a mensagem:', error));
}

// Função que será chamada quando a página carregar
function onLoad() {
    fetchCurrentTime(); // Chama a função de buscar a hora atual
    getClima(); // Chama a função de buscar o clima
    fetchDate(); // Chama a função para atualizar a data inicialmente
    fetchMensagem(); // Chama a função para buscar a mensagem inicialmente
  

}
// Atualiza a hora a cada segundo
setInterval(fetchCurrentTime, 1000);

// Chama a função getClima a cada 15 minutos
setInterval(getClima, 900000); // 900000ms = 15 minutos

// Verifica a mensagem a cada hora
setInterval(fetchMensagem, 3600000); // 3600000ms = 1 hora

// Atribuir a função onLoad ao carregar a janela
window.onload = onLoad;
        


