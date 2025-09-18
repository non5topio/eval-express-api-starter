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

  it('returns 404 for POST request to root path', async () => {
    await request(app)
      .post('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404);
  });


  it('includes CORS Access-Control-Allow-Origin header on root response', async () => {
    const response = await request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.headers['access-control-allow-origin']).toBe('*');
  });


  it('includes Helmet security headers on root response', async () => {
    const response = await request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    // Helmet sets X-Content-Type-Options to nosniff by default
    expect(response.headers['x-content-type-options']).toBe('nosniff');
  });


  it('returns the expected JSON payload at root', async () => {
    const response = await request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({ message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄' });
  });

});


 