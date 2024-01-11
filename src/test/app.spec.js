import request from 'supertest';
import app from '../app.js';


// Testes para a rota GET /horaCerta
describe('GET /horaCerta', () => {
  // Testa se a rota /horaCerta retorna um JSON com o status HTTP 200
  it('responde com json a horaCerta', async () => {
    await request(app)
      .get('/horaCerta')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

// Testes para a rota GET /hoje
describe('GET /hoje', () => {
  // Testa se a rota /hoje retorna um JSON com o status HTTP 200
  it('responde com json a hoje', async () => {
    await request(app)
      .get('/hoje')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

// Testes para a rota POST /config
describe('POST /config', () => {
it('deve retornar 400 se um campo obrigatório não for fornecido', async () => {
  const response = await request(app)
    .post('/config')
    .send({
      formatoHora: '',
      escalaTemp: 'Celsius',
      cidade: 'São Paulo',
      sexo: 'Masculino',
      nome: 'João'
    });

  expect(response.status).toBe(400);
  expect(response.body).toEqual({
    status: 1,
    mensagem: "O campo Formato Hora não é informado"
  });
});
});


describe('POST /config', () => {
it('deve retornar 400 se um campo obrigatório não for fornecido', async () => {
  const response = await request(app)
    .post('/config')
    .send({
      formatoHora: '9:09:00',
      escalaTemp: '',
      cidade: 'São Paulo',
      sexo: 'Masculino',
      nome: 'João'
    });

  expect(response.status).toBe(400);
  expect(response.body).toEqual({
    status: 1,
    mensagem: "O campo Escala Temperatura não é informado"
  });
});
});


describe('POST /config', () => {
it('deve retornar 400 se um campo obrigatório não for fornecido', async () => {
  const response = await request(app)
    .post('/config')
    .send({
      formatoHora: '',
      escalaTemp: 'Celsius',
      cidade: 'São Paulo',
      sexo: 'Masculino',
      nome: 'João'
    });

  expect(response.status).toBe(400);
  expect(response.body).toEqual({
    status: 1,
    mensagem: "O campo Formato Hora não é informado"
  });
});
});


describe('POST /config', () => {
it('deve retornar 400 se um campo obrigatório não for fornecido', async () => {
  const response = await request(app)
    .post('/config')
    .send({
      formatoHora: '9:09:00',
      escalaTemp: 'C',
      cidade: '',
      sexo: 'Masculino',
      nome: 'João'
    });

  expect(response.status).toBe(400);
  expect(response.body).toEqual({
    status: 1,
    mensagem: "O campo Cidade não informado"
  });
});
});


describe('POST /config', () => {
it('deve retornar 400 se um campo obrigatório não for fornecido', async () => {
  const response = await request(app)
    .post('/config')
    .send({
      formatoHora: '9:09:00',
      escalaTemp: 'Celsius',
      cidade: 'São Paulo',
      sexo: '',
      nome: 'João'
    });

  expect(response.status).toBe(400);
  expect(response.body).toEqual({
    status: 1,
    mensagem: "O campo Sexo não é informado"
  });
});
});


describe('POST /config', () => {
it('deve retornar 400 se um campo obrigatório não for fornecido', async () => {
  const response = await request(app)
    .post('/config')
    .send({
      formatoHora: '9:09:00',
      escalaTemp: 'C',
      cidade: 'Sao Paulo',
      sexo: 'Masculino',
      nome: ''
    });

  expect(response.status).toBe(400);
  expect(response.body).toEqual({
    status: 1,
    mensagem: "O campo Nome não é informado"
  });
});
});


// Teste para a rota GET /config
describe('GET /config', () => {
  // Testa se a rota /config retorna com sucesso as configurações do banco de dados
  it('Deve retornar com sucesso as configurações do banco de dados', async () => {
    const response = await request(app).get('/config');

    expect(response.status).toBe(200); // Verifica se o status é 200
    expect(response.body).toEqual([ // Verifica se o corpo da resposta é como esperado
      {
        id: 1,
        formatoHora: 12,
        escalaTemp: "C",
        cidade: "Brusque",
        sexo: "F",
        nome: "Francine"
      }
    ]);
  });
});