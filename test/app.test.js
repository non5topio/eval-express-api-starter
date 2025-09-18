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

  it('helmet adds security headers', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('X-DNS-Prefetch-Control', 'off')
      .expect('X-Frame-Options', 'SAMEORIGIN')
      .expect('X-Content-Type-Options', 'nosniff')
      .expect('Referrer-Policy', 'no-referrer')
      .expect(200)
      .end(done);
  });


  it('POST to root returns not found', (done) => {
    request(app)
      .post('/')
      .send({ dummy: 'data' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(done);
  });


  it('root GET ignores query parameters', (done) => {
    request(app)
      .get('/?foo=bar&num=123')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('message', '🦄🌈✨👋🌎🌍🌏✨🌈🦄');
      })
      .end(done);
  });


  it('returns unicorn message on root GET', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('message', '🦄🌈✨👋🌎🌍🌏✨🌈🦄');
      })
      .end(done);
  });

});


 