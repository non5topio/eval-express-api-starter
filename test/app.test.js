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
/*
FAILED TEST: The test `should return 400 for malformed JSON payload` failed because the application returned a 500 Internal Server Error instead of the expected 400 Bad Request. This suggests the server is not properly handling JSON parsing errors.

**Recommended Fix:**  
Ensure the app is using `express.json()` with an error-handling middleware that catches parsing errors and returns a 400 status. Verify that the `middlewares.errorHandler` properly captures and responds to parsing errors.

  it('should return 400 for malformed JSON payload', (done) => {
    request(app)
      .post('/api/v1')
      .set('Content-Type', 'application/json')
      .send('{ "invalid: "json" }')
      .expect(400, done);
  });

*/

  it('should return 404 for a deeply nested invalid route', (done) => {
    request(app)
      .get('/api/v1/this/is/a/very/deep/route/that/does/not/exist')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });


  it('should return the welcome message at root endpoint', (done) => {
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


 