
document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.querySelector('.button');
    saveButton.addEventListener('click', () => {
        const hora = document.querySelector('.input1').value;
        const isAm = document.getElementById('idTimeSetAm').checked;
        const descricao = document.querySelector('.input2').value;

        const alarme = {
            isAtivo: true,
            hora: hora,
            isAm: isAm,
            descricao: descricao
        };

        fetch('/novoAlarme', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alarme)
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Erro:', error));
    });
});
