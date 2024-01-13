// Função para atualizar a cor de fundo com base na hora atual
function updateBackgroundColor() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    let amanhecerTotal;
    let anoitecerTotal;
    fetch('/clima?cidade=Blumenau')
        .then(response => response.json())
        .then(data => {
            let amanhecer = data.sunrise
            let amOuPmAmanhecer = amanhecer[6] + amanhecer[7]
            let amanhecerHoras = amanhecer[0] + amanhecer[1]
            if (amOuPmAmanhecer == "pm") {
                amanhecerHoras = amanhecerHoras * 1 + 12
            }
            let amanhecerMinutos = amanhecer[3] + amanhecer[4]
            amanhecerTotal = amanhecerHoras * 60 + Number(amanhecerMinutos)
            let anoitecer = data.sunset
            let amOuPmAnoitecer = anoitecer[6] + anoitecer[7]
            let anoitecerHoras = anoitecer[0] + anoitecer[1]
            if (amOuPmAnoitecer == "pm") {
                anoitecerHoras = anoitecerHoras * 1 + 12
            }
            let anoitecerMinutos = anoitecer[3] + anoitecer[4]
            anoitecerTotal = anoitecerHoras * 60 + Number(anoitecerMinutos)

            const timeInMinutes = hours * 60 + minutes;
            let backgroundColor;
            if (timeInMinutes >= amanhecerTotal && timeInMinutes < 720) {
                bordaBotao = "2px solid var(--sunrise4)";
                fonteBotao = "var(--sunrise4)"
                backColorBotao = "var(--sunrise4)"
                fonteGeral = "var(--sunrise2)"
            }
            else if (timeInMinutes >= 720 && timeInMinutes <= anoitecerTotal) {
                bordaBotao = "2px solid var(--noon4)";
                fonteBotao = "var(--noon4)"
                backColorBotao = "var(--noon4)"
                fonteGeral = "var(--noon2)"
            }
            else if (timeInMinutes >= anoitecer && timeInMinutes < 1320) {
                bordaBotao = "2px solid var(--afternoon4)";
                fonteBotao = "var(--afternoon4)"
                backColorBotao = "var(--afternoon4)"
                fonteGeral = "var(--afternoon2)"
            }
            else {
                bordaBotao = "2px solid var(--night4)";
                fonteBotao = "var(--night4)"
                backColorBotao = "var(--night4)"
                fonteGeral = "var(--night2)"
            }
            const elementosColorFonte = document.querySelectorAll('.colorFonte');
            elementosColorFonte.forEach(function(elemento) {
                elemento.style.color = fonteGeral;
            });

            const button = document.querySelector('.button');
            button.style.border = bordaBotao;
            button.style.color = fonteBotao;
            button.style.backgroundColor = '';
            button.addEventListener('mouseover', function () {
                button.style.backgroundColor = backColorBotao;
                button.style.color = "var(--neutral5)";
            });
            button.addEventListener('mouseout', function () {
                button.style.backgroundColor = '';
                button.style.color = fonteBotao;
            });

        })
        .catch(error => console.error('Erro ao carrecar informações:', error));
}


document.querySelector("#adiarAlarme").style.display = "none"
let diaAtual = new Date().getDate();

//função de buscar a hora atual
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
//função de buscar o climas
function getClima() {
    fetch('/clima?cidade=Blumenau')
        .then(response => response.json())
        .then(data => {
            let grausCelsius = data.tempNow
            console.log(grausCelsius + "c")
            let grausFahrenheit = grausCelsius * 1.8 + 32
            console.log(grausFahrenheit + "f")
            let grausKelvin = grausCelsius - 273
            console.log(grausKelvin + "k")
            document.querySelector('.current-temp').textContent = "Now: " + grausCelsius + "°C";
        })
        .catch(error => console.error('Erro ao buscar o clima:', error));
}

let ultimaHoraVerificada = null;

// Função para atualizar a data
function fetchDate() {
    const hoje = new Date();
    const diaHoje = hoje.getDate();

    fetch('/hoje')
        .then(response => response.json())
        .then(data => {
            document.getElementById('data-atual').textContent = data.dataCerta;
            diaAtual = diaHoje;
        })
        .catch(error => console.error('Erro ao buscar a data atual:', error));

    // Se mudou para um novo dia, busca a data formatada e atualiza a tela
    if (diaHoje !== diaAtual) {
        fetch('/hoje')
            .then(response => response.json())
            .then(data => {
                document.getElementById('data-atual').textContent = data.dataCerta;
                diaAtual = diaHoje;
            })
            .catch(error => console.error('Erro ao buscar a data atual:', error));
    }
}
//função para buscar a mensagem
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
    updateBackgroundColor(); // Chama a função para atualizar a cor de fundo inicialmente'
}

// Atualiza a hora a cada segundo
setInterval(fetchCurrentTime, 1000);

// Define um intervalo para atualizar a cor de fundo a cada minuto (60000 milissegundos)
setInterval(updateBackgroundColor, 60000);

// Chama a função getClima a cada 15 minutos
setInterval(getClima, 900000); // 900000ms = 15 minutos

// Verifica a mensagem a cada hora
setInterval(fetchMensagem, 3600000); // 3600000ms = 1 hora

// Atribuir a função onLoad ao carregar a janela
window.onload = onLoad;


var chamarTela3 = document.getElementById('idBuscarTelaAlarmes')
chamarTela3.addEventListener("click", tratamentoChamarTela3)
function tratamentoChamarTela3() {
    if (document.getElementById("idBuscarTelaAlarmes").textContent == "Set alarm.")
        window.location.href = "/alarmPage"
}



