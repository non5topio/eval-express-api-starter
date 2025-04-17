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
});

describe('GET /', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
      }, done);
  });

  it('responds correctly to CORS preflight (OPTIONS) requests', (done) => {
    request(app)
      .options('/api/v1/some-endpoint') // Target an endpoint under /api/v1
      .set('Origin', 'http://example.com')
      .set('Access-Control-Request-Method', 'POST') // Requesting permission for POST
      .set('Access-Control-Request-Headers', 'Content-Type, Authorization') // Requesting permission for headers
      .expect('Access-Control-Allow-Origin', '*') // Expect allow all origins (default) or http://example.com if configured
      .expect('Access-Control-Allow-Methods', /POST/) // Expect POST to be listed
      .expect('Access-Control-Allow-Headers', /Content-Type, Authorization/) // Expect requested headers to be allowed
      .expect(204, done); // Expect 204 No Content for successful preflight
  });


  it('responds with Helmet security headers', (done) => {
    request(app)
      .get('/')
      .expect('X-DNS-Prefetch-Control', 'off') // Example Helmet header
      .expect('X-Frame-Options', 'SAMEORIGIN') // Example Helmet header
      // .expect('Strict-Transport-Security', /max-age=/) // HSTS might not be enabled by default
      .expect('X-Download-Options', 'noopen') // Example Helmet header
      .expect('X-Content-Type-Options', 'nosniff') // Example Helmet header
      .expect('X-XSS-Protection', '0') // Example Helmet header (modern default)
      .expect(200, done);
  });


  it('responds with JSON even for non-JSON Accept header', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'text/html') // Set a different Accept header
      .expect('Content-Type', /json/) // Should still respond with JSON
      .expect(200, {
        message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
      }, done);
  });


  it('responds with 404 for POST to non-existent route', (done) => {
    request(app)
      .post('/non-existent-path-post') // Use POST method
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        // Check for a message property, assuming the notFound handler sends one
        expect(res.body).toHaveProperty('message');
        done();
      });
  });


  it('responds with CORS header (Access-Control-Allow-Origin: *) when Origin is present', (done) => {
    request(app)
      .get('/')
      .set('Origin', 'http://example.com') // Provide an Origin header
      .expect('Access-Control-Allow-Origin', '*') // Default CORS allows all origins
      .expect(200, done);
  });


  it('responds with Helmet security headers', (done) => {
    request(app)
      .get('/')
      .expect('X-DNS-Prefetch-Control', 'off') // Example Helmet header
      .expect('X-Frame-Options', 'SAMEORIGIN') // Example Helmet header
      .expect('Strict-Transport-Security', /max-age=/) // Example Helmet header (value might vary)
      .expect('X-Download-Options', 'noopen') // Example Helmet header
      .expect('X-Content-Type-Options', 'nosniff') // Example Helmet header
      .expect('X-XSS-Protection', '0') // Example Helmet header (modern default)
      .expect(200, done);
  });


  describe('Unsupported methods on /', () => {
    const methods = ['POST', 'PUT', 'DELETE', 'PATCH']; // Add other methods as needed
    methods.forEach((method) => {
      it(`responds with 404 for ${method} /`, (done) => {
        request(app)
          [method.toLowerCase()]('/') // Dynamically call request method
          .expect('Content-Type', /json/) // Not found handler responds with JSON
          .expect(404, done);
      });
    });
  });


  it('ignores body and proceeds for non-JSON Content-Type, likely resulting in 404', (done) => {
    request(app)
      .post('/api/v1/nonexistent-endpoint-for-content-type-test') // Use a non-existent path
      .set('Content-Type', 'text/plain') // Incorrect Content-Type
      .send('{"key": "value"}') // JSON-like body
      .expect('Content-Type', /json/) // The final 404 handler responds with JSON
      .expect(404, done); // express.json ignores body, routing fails -> 404
  });


  it('responds with JSON even for non-JSON Accept header', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'text/html') // Set a different Accept header
      .expect('Content-Type', /json/) // Should still respond with JSON
      .expect(200, {
        message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
      }, done);
  });

});

 