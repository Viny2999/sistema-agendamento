const request = require('supertest');
const app = require('../app');

/**
 * Testando endpoint de todas reservas
 */
describe('GET /reservas', () => {
  it('Respondeu com um json contendo uma lista de todas as reservas', (done) => {
    request(app)
      .get('/reservas')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

/**
 * Testando endpoint de uma reserva especifica
 */
describe('GET /reservas/:id', () => {
  it('Respondeu com um json contendo uma unica reserva', (done) => {
    request(app)
      .get('/reservas/5ca7b1fb498c8e59ac0109fa')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

/**
 * Testando endpoint de criacao de reserva
 */
describe('POST /reservas', () => {
  let data = {
    "tipo": "HARD",
    "inicioEm": "2019-01-01T19:00:00Z",
    "fimEm": "2019-01-01T20:00:00Z"
  }
  it('Respondeu com 200 para a criação', (done) => {
    request(app)
      .post('/reservas')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });


});