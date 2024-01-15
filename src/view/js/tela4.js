
document.addEventListener('DOMContentLoaded', () => {
    let id = 0
    const getAllAlarms = () => {
        fetch('/todosAlarmes', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(alarms => {
                // Utilize o spread operator para adicionar os alarmes ao array
                const alarmList = []
                alarmList.push(...alarms);
                console.log(alarmList);
                if (alarmList.length != 0) {
                    id = getMaxId(alarmList) + 1;
                    console.log('Prox ID:', id);
                }
            })
            .catch(error => console.error('Erro ao obter os alarmes:', error));

    };

    // Chama getAllAlarms quando a página é carregada
    getAllAlarms();
    const saveButton = document.querySelector('.button');
    saveButton.addEventListener('click', () => { 
        fetch('/todosAlarmes', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(alarms => {
                const alarmList = []
                alarmList.push(...alarms);
                if (alarmList.length >= 6) {
                    alert("O limite máximo de alarmes foi atingido")
                } else {
                            const hora = document.querySelector('.input1').value;
                            const isAm = document.getElementById('idTimeSetAm').checked;
                            const descricao = document.querySelector('.input2').value;
                    
                            const alarme = {
                                isAtivo: true,
                                hora: hora,
                                isAm: isAm,
                                descricao: descricao,
                                id: id
                            };
                    
                            fetch('/novoAlarme', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(alarme)
                            })
                            .then(response => response.text())
                            .then(data => console.log(data))
                            .catch(error => console.error('Erro:', error));
                            getAllAlarms()
                }    
            })    
            .catch(error => console.error('Erro ao obter os alarmes:', error));

            window.location.href = "/alarmPage";
    });

    function getMaxId(alarmList) {

        // Usa o método reduce para encontrar o maior id
        const maiorId = alarmList.reduce((maxId, element) => {
            const id = parseInt(element.id);
            return id > maxId ? id : maxId;
        }, -1);

        return maiorId;
    }
});
