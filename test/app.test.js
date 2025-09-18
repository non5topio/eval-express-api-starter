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

  it('should include helmet and CORS security headers on GET /', async () => {
    const response = await request(app)
      .get('/')
      .expect(200);
  
    const headers = response.headers;
  
    // Helmet headers
    expect(headers['x-dns-prefetch-control']).toBe('off');
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-frame-options']).toBe('SAMEORIGIN');
    expect(headers['x-xss-protection']).toBe('0');
  
    // CORS header
    expect(headers['access-control-allow-origin']).toBe('*');
  
    // Ensure Express default X-Powered-By header is removed by helmet
    expect(headers).not.toHaveProperty('x-powered-by');
  });


  it('should respond with 404 for POST / (method not allowed)', async () => {
    await request(app)
      .post('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404);
  });


  it('should return JSON even when Accept is text/plain', async () => {
    const response = await request(app)
      .get('/')
      .set('Accept', 'text/plain')
      .expect('Content-Type', /json/)
      .expect(200);
  
    expect(response.body).toEqual({
      message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
    });
  });


  it('should return unicorn message on GET /', async () => {
    const response = await request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  
    expect(response.body).toEqual({
      message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
    });
  });

});


 