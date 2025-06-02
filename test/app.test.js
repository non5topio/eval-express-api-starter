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

  it('responds with 404 for a non-existent endpoint with invalid Accept header', (done) => {
    request(app)
      .get('/api/v1/non-existent')
      .set('Accept', 'text/html')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });


  it('responds with 404 for a non-existent endpoint with trailing slash', (done) => {
    request(app)
      .get('/api/v1/non-existent/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });


  it('responds with the expected message at the root endpoint', (done) => {
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


 