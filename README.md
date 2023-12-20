# Projeto Despertador 

## Equipe
A equipe é composta por:

- [Felipe Gabriel Kretzer](https://github.com/kretzerfelipe)
- [Elias Vinícius Raitz de Oliveira](https://github.com/EliasViniciusRaitz)
- [Stéphanie Possamai](https://github.com/Stephanieposs)
- [Letícia de Lima da Cunha](https://github.com/Leticia-LC)
- [Amabile Forster](https://github.com/AmabileForster)
- [Francine dos Santos](https://github.com/FranNinaa)

### Objetivos
Este projeto visa aplicar na prática o uso de JavaScript no Backend com Node.js, fortalecendo os conceitos de consumo de API, processamento assíncrono, lógica de programação e interpretação de especificações técnicas. A dinâmica do desenvolvimento em equipe segue metodologias ágeis, com papéis definidos (Scrum Master, Tech Lead, Desenvolvedor) para simular um ambiente de trabalho em uma empresa de TI.

### Papéis na Equipe
- **Scrum Master:** Responsável por moderar as reuniões da equipe, garantir a adesão à metodologia Agile e facilitar correções em desvios.
- **Tech Lead:** Além de desenvolver, é responsável por criar o repositório no GitHub, consolidar alterações e ser líder técnico para dúvidas da equipe.
- **Desenvolvedores:** Integrantes da equipe que desempenham o papel de desenvolvedor.
  
### Ambiente de Trabalho
- **Kanban:** Utilização do Trello para criar um Quadro Kanban e monitorar o progresso.
- **GitHub:** Criação de um repositório para a equipe, concedendo acesso a cada integrante.
  
### O Projeto
**Descrição Funcional**
Desenvolver um Relógio-Despertador que apresente a hora, dados meteorológicos da cidade do usuário, data atual, mensagem de boas-vindas e a capacidade de programar alarmes com lembretes personalizados. O relógio possui seu próprio mecanismo de contagem de tempo e sincroniza automaticamente a Hora Certa com o servidor.

### Configurações
- Formato da hora, escala de temperaturas e cidade do usuário são configuráveis.
- Telas responsivas que se adaptam a celulares e telas maiores.
### Descrição Técnica
**Interface**
- Desenvolvimento das telas em HTML, CSS e JavaScript.
**Telas:**
- Tela Principal
- Configurações
- Alarmes
- Novo Alarme
  
**Detalhamento das Telas**
### Tela Principal
 - Invoca métodos para obter dados climáticos, hora certa, data atual e mensagem de boas-vindas.
- Atualiza automaticamente a cada 15 minutos, horas cheias e mudança do dia.
- Botão multi-funcional: Desliga alarme ou acessa a tela de Alarmes.
  
### Configurações
- Invoca método para cadastrar configurações.
- Link para a tela principal.
- Carrega configurações ao carregar a tela.
### Alarmes
- Link para Novo Alarme e Tela Principal.
- Carrega dados de alarmes configurados, permitindo desativar individualmente.
### Novo Alarme
- Salva dados do alarme em um vetor.
- Link para a Tela Principal.
  
## Detalhamento do Backend
### Endpoints
**a. Informações Meteorológicas**

- Função: getClima(cidade)
- Mapeamento: (GET) /clima?cidade='Blumenau'
- Retorno: Objeto com dados meteorológicos.
  
**b. Hora Certa**

- Função: getHoraCerta()
- Mapeamento: (GET) /horaCerta
- Retorno: Objeto com a hora do sistema.
**c. Data Hoje**

- Função: getHoje()
- Mapeamento: (GET) /hoje
- Retorno: Objeto com a data atual.
  
**d. Mensagem de Boas Vindas**

- Função: getMsn()
- Mapeamento: (GET) /msn
- Retorno: Objeto com mensagem personalizada.
  
**e. Cadastro de Configurações**

- Função: postConfig(formatoHora, escalaTemp, cidade, sexo, nome)
- Mapeamento: (GET) /config?formatoHora=''&escalaTemp=''&cidade=''&sexo=''&nome=''
- Retorno: Objeto com status e mensagem.
  
**f. Buscar Configurações**

- Função: getConfig()
- Mapeamento: (GET) /config
- Retorno: Objeto com status, mensagem e configurações.
  
### Design
As telas devem seguir paletas de cores específicas para diferentes momentos do dia, proporcionando uma experiência visual agradável.

### Protótipo das Telas
Figma - Protótipo

### Ringtones
Ringtones podem ser obtidos nos sites:

- Zedge Ringtones
- Prokerala Ringtones
  
Este projeto proporcionará uma experiência completa no desenvolvimento de um sistema, desde a organização em equipe até a implementação de funcionalidades utilizando JavaScript no Backend.



