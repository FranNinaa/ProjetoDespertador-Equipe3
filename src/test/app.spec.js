import request from 'supertest';
import app from '../app.js';


describe('GET /horaCerta', () => {

    it('responde com json a horaCerta', async () => {
      await request(app)
        .get('/horaCerta')
        .expect('Content-Type', /json/)
        .expect(200);
    });

});

describe('GET /hoje', () => {

    it('responde com json a hoje', async () => {
      await request(app)
        .get('/hoje')
        .expect('Content-Type', /json/)
        .expect(200);
    });

});





   