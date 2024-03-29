document.addEventListener('DOMContentLoaded', () => {
    const alarmList = []; // Array para armazenar os alarmes
    const idElementoPai = document.getElementById('idElementoPai'); // Moveu a declaração aqui

    const getAllAlarms = () => {
        fetch('/todosAlarmes', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(alarms => {
                // Utilize o spread operator para adicionar os alarmes ao array
                alarmList.push(...alarms);
                alarmList.sort((a, b) => {
                    const horaA = parseInt(a.hora.replace(':', ''));
                    const horaB = parseInt(b.hora.replace(':', ''));
                    return horaA - horaB;
                });

                console.log(alarmList);

                alarmList.forEach(element => {
                    // Criar elemento div com a classe "card1"
                    const divCard = document.createElement('div');
                    divCard.classList.add('card1', 'mb-3');

                    let checked1 = "checked"

                    if (element.isAtivo == "false") {
                        checked1 = "";
                        console.log("Checkbox não está marcado");
                    }

                    console.log(`ID: ${element.id}, isAtivo: ${element.isAtivo}, checked1: ${checked1}`);

                    // Criar a estrutura interna do card com as informações do alarme
                    const innerHtml = `
                        <div class="row">
                            <div class="col-2">
                                <input type="checkbox" id="customCheckbox${element.id}" class="custom-checkbox checkbox-margin" ${checked1}>
                            </div>
                            <div class="col">
                                <p class="horario-timer d-flex justify-content-start mb-0">${element.hora}</p>
                            </div>
                        </div>
                        <div class="row">
                            <p class="p2-margin d-flex justify-content-start ms-1">${element.descricao}</p>
                        </div>
                    `;

                    // Definir o HTML interno da divCard
                    divCard.innerHTML = innerHtml;

                    if (idElementoPai) {
                        idElementoPai.appendChild(divCard);
                    } else {
                        console.error("Elemento pai não encontrado ou é nulo.");
                    }
                });

                // Adiciona o evento de escuta para todos os checkboxes
                const checkboxes = document.querySelectorAll('.custom-checkbox');
                checkboxes.forEach(checkbox => {
                    checkbox.addEventListener('change', () => {
                        const isChecked = checkbox.checked;
                        const alarmId = checkbox.id.replace('customCheckbox', ''); // Obtém o ID do alarme
                        console.log
                        updateAlarmStatus(alarmId, isChecked);
                    });
                });
            })
            .catch(error => console.error('Erro ao obter os alarmes:', error));
    };

    // Chama getAllAlarms quando a página é carregada
    getAllAlarms();

    const updateAlarmStatus = (id, isAtivo) => {
        fetch('/atualizarStatusAlarme', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, isAtivo }),
        })
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error('Erro ao atualizar o status do alarme:', error));
    };

    var chamarTela4 = document.getElementById('idBuscarTelaNovoAlarme');
    chamarTela4.addEventListener("click", tratamentoChamarTela4);

    function tratamentoChamarTela4() {
        window.location.href = "/newAlarmPage";
    };
});