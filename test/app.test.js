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
});

  it('includes appropriate security headers from Helmet', (done) => {
    request(app)
      .get('/')
      .expect((res) => {
        // Check for common Helmet headers
        // The exact set may vary based on Helmet version and configuration
        const helmetHeaders = [
          'x-dns-prefetch-control',
          'x-frame-options',
          'strict-transport-security',
          'x-download-options',
          'x-content-type-options',
          'x-xss-protection'
        ];
        
        // We expect at least some of these headers to be present
        const presentHeaders = helmetHeaders.filter(header => 
          Object.keys(res.headers).includes(header)
        );
        
        expect(presentHeaders.length).toBeGreaterThan(0);
      })
      .end(done);
  });


  it('responds correctly to CORS preflight requests', (done) => {
    request(app)
      .options('/')
      .set('Origin', 'http://example.com')
      .set('Access-Control-Request-Method', 'GET')
      .set('Access-Control-Request-Headers', 'Content-Type')
      .expect((res) => {
        expect(res.headers).toHaveProperty('access-control-allow-origin');
        // The status code might vary depending on CORS configuration
        // Common responses are 204 or 200
        expect([200, 204]).toContain(res.statusCode);
      })
      .end(done);
  });


  it('returns 404 for invalid API version format', (done) => {
    request(app)
      .get('/api/invalid-version/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(/not found/i);
      })
      .end(done);
  });


  it('handles malformed JSON in request body', (done) => {
    request(app)
      .post('/api/v1/test')
      .set('Content-Type', 'application/json')
      .send('{invalid json}')
      .expect('Content-Type', /json/)
      .expect((res) => {
        // The exact status code might be 400 or 500 depending on how express is configured
        expect(res.status).toBeGreaterThanOrEqual(400);
        expect(res.body).toHaveProperty('message');
      })
      .end(done);
  });


  it('handles extremely long paths gracefully', (done) => {
    // Create a very long path (10,000 characters)
    const longPath = '/api/v1/' + 'a'.repeat(10000);
    
    request(app)
      .get(longPath)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .expect((res) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(/not found/i);
      })
      .end(done);
  });


  it('handles OPTIONS request with appropriate CORS headers', (done) => {
    request(app)
      .options('/')
      .set('Origin', 'http://example.com')
      .set('Access-Control-Request-Method', 'GET')
      .set('Access-Control-Request-Headers', 'X-Requested-With, Content-Type')
      .expect(204)
      .expect('Access-Control-Allow-Origin', '*')
      .expect('Access-Control-Allow-Methods', /GET/)
      .expect((res) => {
        expect(res.headers['access-control-allow-headers']).toBeTruthy();
      })
      .end(done);
  });


  it('includes security headers set by helmet', (done) => {
    request(app)
      .get('/')
      .expect((res) => {
        expect(res.headers).toHaveProperty('x-dns-prefetch-control');
        expect(res.headers).toHaveProperty('x-content-type-options');
        expect(res.headers).toHaveProperty('x-frame-options');
        expect(res.headers).toHaveProperty('x-download-options');
        expect(res.headers).toHaveProperty('x-xss-protection');
      })
      .end(done);
  });


  it('includes CORS headers in response', (done) => {
    request(app)
      .get('/')
      .set('Origin', 'http://example.com')
      .expect('Access-Control-Allow-Origin', '*')
      .expect(200, done);
  });


  it('responds with 404 for unsupported HTTP methods on root endpoint', (done) => {
    request(app)
      .patch('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });


  it('responds with 404 for non-existent deeply nested API paths', (done) => {
    request(app)
      .get('/api/v1/deeply/nested/path/structure')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });


// it('includes CORS headers in response', (done) => {
//   request(app)
//     .get('/')
//     .set('Origin', 'http://example.com')
//     .expect((res) => {
//       expect(res.headers).toHaveProperty('access-control-allow-origin');
//     })
//     .end(done);
// });


// it('includes security headers set by helmet', (done) => {
//   request(app)
//     .get('/')
//     .expect((res) => {
//       // Check for common helmet security headers
//       // The exact headers may vary depending on helmet version
//       expect(res.headers).toHaveProperty('x-dns-prefetch-control');
//       expect(res.headers).toHaveProperty('x-content-type-options');
//       // Additional headers that might be present
//       expect(res.headers).toHaveProperty('strict-transport-security');
//     })
//     .end(done);
// });


// it('includes CORS headers in response', (done) => {
//   request(app)
//     .get('/')
//     .set('Origin', 'http://example.com')
//     .expect('Access-Control-Allow-Origin', '*')
//     .expect(200, done);
// });


// it('includes security headers set by helmet', (done) => {
//   request(app)
//     .get('/')
//     .expect((res) => {
//       expect(res.headers).toHaveProperty('x-dns-prefetch-control');
//       expect(res.headers).toHaveProperty('x-frame-options');
//       expect(res.headers).toHaveProperty('x-download-options');
//       expect(res.headers).toHaveProperty('x-content-type-options');
//       expect(res.headers).toHaveProperty('x-xss-protection');
//     })
//     .end(done);
// });


// it('responds with a not found message for non-existent API endpoint', (done) => {
//   request(app)
//     .get('/api/v1/non-existent')
//     .set('Accept', 'application/json')
//     .expect('Content-Type', /json/)
//     .expect(404, done);
// });

// describe('CORS Preflight (OPTIONS /)', () => {
//   it('should handle OPTIONS request with appropriate CORS headers', (done) => {
//     request(app)
//       .options('/')
//       .set('Origin', 'http://another-domain.com')
//       .set('Access-Control-Request-Method', 'GET')
//       .set('Access-Control-Request-Headers', 'X-Requested-With, Content-Type')
//       .expect(204) // No Content for successful preflight
//       .expect('Access-Control-Allow-Origin', '*') // Assuming default '*' or specific origin based on config
//       .expect('Access-Control-Allow-Methods', /GET/) // Check if GET is allowed
//       .expect('Access-Control-Allow-Headers', /X-Requested-With, Content-Type/i) // Check if requested headers are allowed
//       .end(done);
//   });
// });

// it('includes additional security headers set by helmet', (done) => {
//   request(app)
//     .get('/')
//     .expect((res) => {
//       // Check for headers potentially not covered in existing tests
//       // Exact headers depend on Helmet version and defaults. Adjust as needed.
//       expect(res.headers).toHaveProperty('referrer-policy');
//       // expect(res.headers['referrer-policy']).toBe('strict-origin-when-cross-origin'); // Example specific value check
//       expect(res.headers).toHaveProperty('x-permitted-cross-domain-policies');
//       // expect(res.headers['x-permitted-cross-domain-policies']).toBe('none'); // Example specific value check
//       // Add checks for other headers like:
//       // expect(res.headers).toHaveProperty('cross-origin-embedder-policy');
//       // expect(res.headers).toHaveProperty('cross-origin-opener-policy');
//       // expect(res.headers).toHaveProperty('cross-origin-resource-policy');
//     })
//     .end(done);
// });


// it('responds with 404 Not Found for POST requests to /', (done) => {
//   request(app)
//     .post('/')
//     .send({ data: 'some data' })
//     .set('Accept', 'application/json')
//     .expect('Content-Type', /json/)
//     .expect(404, done);
// });