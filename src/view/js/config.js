
        
//obtendo os dados da configuração da tela do usuario
const form = document.getElementById('configForm');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const data = {
    formatoHora: formData.get('nmTimeFormat'), 
    escalaTemp: formData.get('nmTemperatureFormat'), 
    cidade: formData.get('nmCity'),
    sexo: formData.get('nmMrOrMrs') === 'idMr' ? 'M' : 'F', 
    nome: formData.get('nmName')
  };

  try {
    const response = await fetch('/config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);

  } catch (error) {
    console.error('Erro ao enviar configuração', error);
  }
});


document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/config');
      const configuracoes = await response.json();
     
      const config = configuracoes[0]; 
  
      // Definindo os valores dos campos com base na configuração recebida
      document.querySelector(`input[name="nmTimeFormat"][value="${config.formatoHora}"]`).checked = true;
      document.querySelector(`input[name="nmTemperatureFormat"][value="${config.escalaTemp}"]`).checked = true;
      document.getElementById('idCity').value = config.cidade;
      document.querySelector(`input[name="nmMrOrMrs"][value="${config.sexo === 'M' ? 'idMr' : 'idMrs'}"]`).checked = true;
      document.getElementById('idName').value = config.nome;
  
    } catch (error) {
      console.error('Falha ao carregar configurações', error);
    }
  });