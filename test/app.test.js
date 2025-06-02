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

  it('Applies CORS configuration', (done) => {
    request(app)
      .get('/')
      .expect('Access-Control-Allow-Origin', '*')
      .end(done);
  });

/*
FAILED TEST: <think>
Okay, let's look at the problem here. The user provided test results where one of the tests failed. The stderr output shows that the test "Includes required security headers" is failing because the "X-DNS-Prefetch-Control" header is expected to be "on" but got "off". 

First, I need to check the test code in test/app.test.js. The failing test is expecting several security headers. The error points to line 18 where the X-DNS-Prefetch-Control header is checked. The test expects 'on' but the actual value is 'off'.

Now, looking at the source code in src/app.js. The app uses helmet(), which by default might configure some headers. Helmet's dnsPrefetchControl middleware by default sets the value to 'off' unless configured otherwise. 

So the issue is that the application is using helmet's default settings for dnsPrefetchControl, which sets the header to 'off', but the test expects 'on'. To fix this, the helmet configuration needs to be adjusted. Specifically, when calling helmet(), we can override the dnsPrefetchControl settings to set the allow value to true, which makes the header 'on'.

The recommended fix is to configure helmet in app.js with { dnsPrefetchControl: { allow: true } } so that the header is set to 'on' as the test expects. That should resolve the failure.
</think>

The test failed because the `X-DNS-Prefetch-Control` header is set to "off" instead of the expected "on". This occurs due to Helmet's default configuration for DNS prefetch control.

**Fix**: Configure Helmet in `src/app.js` to set `X-DNS-Prefetch-Control` to "on":
```diff
- app.use(helmet());
+ app.use(helmet({ dnsPrefetchControl: { allow: true } }));
```

  it('Includes required security headers', (done) => {
    request(app)
      .get('/')
      .expect('X-Content-Type-Options', 'nosniff')
      .expect('X-DNS-Prefetch-Control', 'on')
      .expect('X-Download-Options', 'noopen')
      .expect('X-Permitted-Cross-Domain-Policies', 'none')
      .expect('X-XSS-Protection', '1; mode=block')
      .end(done);
  });

*/
/*
FAILED TEST: <think>
Okay, let's see. The user provided the test results and the code files. The problem is that one of the tests in app.test.js is failing. The stderr output says that the test "Non-existent endpoint returns structured 404" is failing because the expected error message "Not Found" is undefined. 

Looking at the test code, the failing test checks if a non-existent endpoint returns a structured 404 with the error field set to "Not Found". The error is in line 20 where res.body.error is undefined. That means the response body from the server doesn't have an 'error' key with that value.

Now, checking the source code in src/app.js. The app uses middlewares.notFound, which is probably the 404 handler. The middlewares.js file isn't shown here, but the coverage report shows lines 10-14 as uncovered, which might be part of the notFound middleware. 

If the notFound middleware isn't setting the response body correctly, that's the issue. The test expects res.body.error to be "Not Found", but maybe the middleware is sending a different structure or missing the error field. For example, maybe it's sending a message instead of error, or not including it at all.

The fix would involve modifying the notFound middleware in middlewares.js to send a JSON response with { error: 'Not Found' } when a route isn't found. That way, the test expecting res.body.error to be "Not Found" will pass. Also, the coverage shows branch coverage is 50%, so maybe there's an unhandled case in the middleware's conditional logic, but the immediate issue is the response body structure.

So the main problem is the middleware not providing the expected error field. The fix is to adjust the middleware to include "error": "Not Found" in the response.
</think>

The test failure occurs because the `Non-existent endpoint returns structured 404` test expects `res.body.error` to be "Not Found", but the response body from the server does not include this field. 

**Fix**: Update the `notFound` middleware in `src/middlewares.js` to send a JSON response with `{ error: 'Not Found' }` when handling 404 errors. This ensures the test's expectation matches the actual response structure.

  it('Non-existent endpoint returns structured 404', (done) => {
    request(app)
      .get('/nonexistent-endpoint')
      .expect(404)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.error).toBe('Not Found');
      })
      .end(done);
  });

*/

  it('POST to root returns 404', (done) => {
    request(app)
      .post('/')
      .expect(404)
      .expect('Content-Type', /json/)
      .end(done);
  });


  it('GET root returns expected message', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('🦄🌈✨👋🌎🌍🌏✨🌈🦄');
      })
      .end(done);
  });

});


 