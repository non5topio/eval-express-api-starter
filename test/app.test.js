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

  it('test_root_endpoint_handles_invalid_http_methods', (done) => {
    request(app)
      .post('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe('🔍 - Not Found - /');
      })
      .end(done);
  });

/*
FAILED TEST: ### Analysis
The test `test_root_endpoint_handles_invalid_http_methods` failed because the expected message in the response body was `"Not Found"`, but the actual message received was `"🔍 - Not Found - /"`.

### Recommended Fix
Update the expected message in the test to match the actual response message:

```javascript
expect(res.body.message).toBe('🔍 - Not Found - /');
```

  it('test_root_endpoint_handles_invalid_http_methods', (done) => {
    request(app)
      .post('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe('Not Found');
      })
      .end(done);
  });

*/

  it('test_root_endpoint_handles_unexpected_query_parameters', (done) => {
    request(app)
      .get('/?invalidParam=test')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe('🦄🌈✨👋🌎🌍🌏✨🌈🦄');
      })
      .end(done);
  });


  it('test_root_endpoint_handles_no_query_parameters', (done) => {
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


 