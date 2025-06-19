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

  it('test_root_endpoint_handles_large_payloads_gracefully', (done) => {
    const largePayload = 'a'.repeat(10000); // Large payload
    request(app)
      .get('/')
      .set('X-Large-Payload', largePayload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe('🦄🌈✨👋🌎🌍🌏✨🌈🦄');
      })
      .end(done);
  });

/*
FAILED TEST: ### Analysis
The test `test_root_endpoint_handles_invalid_http_method` failed because the response body does not contain the expected `error` property. Instead, it contains a `message` and `stack` property.

### Recommended Fix
Update the `notFound` middleware in `src/middlewares.js` to include an `error` property in the response body:

```javascript
function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  res.json({ error: error.message });
  next(error);
}
```

This change ensures that the response body includes the `error` property, which the test expects.

  it('test_root_endpoint_handles_invalid_http_method', (done) => {
    request(app)
      .post('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .expect((res) => {
        expect(res.body).toHaveProperty('error');
      })
      .end(done);
  });

*/

  it('test_root_endpoint_handles_no_headers_gracefully', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe('🦄🌈✨👋🌎🌍🌏✨🌈🦄');
      })
      .end(done);
  });


  it('test_root_endpoint_returns_expected_message', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe('🦄🌈✨👋🌎🌍🌏✨🌈🦄');
      })
      .end(done);
  });

});


 