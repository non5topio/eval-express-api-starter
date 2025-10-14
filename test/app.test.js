const request = require('supertest');

const app = require('../src/app');

describe('app', () => {
  it('responds with a not found message', (done) => {
    request(app)
      .get('/what-is-this-even')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('should return 404 for invalid endpoint with HTML Accept header', (done) => {
    request(app)
      .get('/invalid-endpoint')
      .set('Accept', 'text/html')
      .expect(404, done);
  });


  it('should return 404 for invalid endpoint with JSON Accept header', (done) => {
    request(app)
      .get('/invalid-endpoint')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });


  it('should return the root message with 200 status', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({
        message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
      })
      .end(done);
  });

});


 