// Função para atualizar a cor de fundo com base na hora atual
function updateBackgroundColor() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    const timeInMinutes = hours * 60 + minutes;

    let backgroundColor; 

    if (timeInMinutes >= 300 && timeInMinutes < 720) {
        const sunriseColors = ['#ffe0bf', '#f3b3a9', '#e88ea0', '#c885b9', '#9863b1'];
        backgroundColor = sunriseColors[Math.floor((timeInMinutes - 300) / 84)];
    }
    else if (timeInMinutes >= 720 && timeInMinutes <= 1470) {
        const afternoonColors = ['#d1f5f3', '#aeecf3', '#5fd7f9', '#54b3ed', '#fefed9'];
        backgroundColor = afternoonColors[Math.floor((timeInMinutes - 720) / 150)];
    }
    else {
        const nightColors = ['#dbdafc', '#9594c8', '#4c4690', '#3d3473', '#373252'];
        let nightTime = timeInMinutes > 1320 ? timeInMinutes - 1320 : timeInMinutes + 240;
        backgroundColor = nightColors[Math.floor(nightTime / 72)];
    }
    document.querySelector('.background').style.backgroundColor = backgroundColor;
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
            console.log(grausCelsius)
            let grausFahrenheit = grausCelsius * 1.8 + 32
            console.log(grausFahrenheit)
            let grausKelvin = grausCelsius - 273
            console.log(grausKelvin)
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
            console.log(data)
        })
        .catch(error => console.error('Erro ao buscar a data atual:', error));

    // Se mudou para um novo dia, busca a data formatada e atualiza a tela
    if (diaHoje !== diaAtual) {
        fetch('/hoje')
            .then(response => response.json())
            .then(data => {
                document.getElementById('data-atual').textContent = data.dataCerta;
                diaAtual = diaHoje;
                console.log(data)
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



