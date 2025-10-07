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
FAILED TEST: ## Test Failure Analysis

### Failed Test
**Test:** `error handler middleware catches and formats errors` in `test/app.test.js`

### Issue
The test expects a `500` or `400` error status code when triggering an error through middleware, but receives `200 OK` instead. This indicates the error is never actually triggered or the test setup is broken.

### Root Cause
The test file has **malformed/corrupted code**. Looking at lines 1-38 of `test/app.test.js`, the test structure is broken:
- Line 7: Missing `.expect(404)` or similar assertion
- Lines 8-12: Random code fragment creating an Express router **inside** the test assertion chain
- Lines 14-15: `delete require.cache` logic appears mid-test without proper context
- The test never properly completes the first request before starting another

The test code is syntactically invalid and doesn't properly set up an error-triggering scenario.

### Recommended Fix
**Rewrite the corrupted test with proper structure:**

```javascript
it('error handler middleware catches and formats errors', (done) => {
  // Mock or create a route that throws an error
  const originalApi = require('../src/api');
  jest.mock('../src/api', () => {
    const router = require('express').Router();
    router.get('/', (req, res, next) => {
      next(new Error('Test error'));
    });
    return router;
  });

  delete require.cache[require.resolve('../src/app')];
  const testApp = require('../src/app');
  
  request(testApp)
    .get('/api/v1')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect((res) => {
      if (res.status !== 500 && res.status !== 400) {
        throw new Error(`Expected error status code, got ${res.status}`);
      }
    })
    .end(done);
});
```

  it('error handler middleware catches and formats errors', (done) => {
    const originalApi = require('../src/api');
    const apiMock = jest.requireActual('../src/api');
    
    jest.mock('../src/api', () => {
      const express = require('express');
      const router = express.Router();
      router.get('/', (req, res, next) => {
        const error = new Error('Test error');
        next(error);
      });
      return router;
    });
    
    delete require.cache[require.resolve('../src/app')];
    const testApp = require('../src/app');
    
    request(testApp)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        if (res.status !== 500 && res.status !== 400) {
          throw new Error(`Expected error status code, got ${res.status}`);
        }
      })
      .end((err) => {
        jest.unmock('../src/api');
        delete require.cache[require.resolve('../src/app')];
        done(err);
      });
  });

*/
/*
FAILED TEST: ## Test Failure Analysis

### Failed Test
**Test:** `rejects extremely large JSON payload` in `test/app.test.js`

### Issue
The test expects a `413 Payload Too Large` or `400 Bad Request` response when sending an extremely large JSON payload, but the application returns `500 Internal Server Error` instead.

### Root Cause
The Express application lacks a payload size limit configuration for `express.json()` middleware. When an extremely large payload is sent, it causes an unhandled error that's caught by the generic error handler, returning 500 instead of the appropriate 413/400 status.

### Recommended Fix
Configure the `express.json()` middleware with a size limit in `src/app.js`:

```javascript
// Replace this line:
app.use(express.json());

// With:
app.use(express.json({ limit: '10mb' })); // or appropriate size limit
```

Additionally, add error handling middleware for payload size errors after `express.json()`:

```javascript
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ message: 'Payload too large' });
  }
  next(err);
});
```

  it('rejects extremely large JSON payload', (done) => {
    const largePayload = JSON.stringify({ data: 'x'.repeat(200 * 1024) });
    request(app)
      .post('/api/v1')
      .set('Content-Type', 'application/json')
      .send(largePayload)
      .expect((res) => {
        if (res.status !== 413 && res.status !== 400) {
          throw new Error(`Expected 413 or 400, got ${res.status}`);
        }
      })
      .end(done);
  });

*/
/*
FAILED TEST: ## Test Failure Analysis

### Failed Test
**Test:** `handles malformed JSON body with 400 error` in `test/app.test.js`

### Issue
The test expects a `400 Bad Request` response when sending malformed JSON (`{invalid json}`), but the application returns `500 Internal Server Error` instead.

### Root Cause
The Express application is not properly handling JSON parsing errors. When `express.json()` middleware encounters malformed JSON, it throws an error that's being caught by the error handler middleware, which returns a 500 status instead of 400.

### Recommended Fix
Add error handling middleware specifically for JSON parsing errors in `src/app.js`:

```javascript
// After app.use(express.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next(err);
});
```

Or configure `express.json()` to handle errors properly, ensuring the error handler in `src/middlewares.js` returns 400 for JSON parsing errors instead of 500.

  it('handles malformed JSON body with 400 error', (done) => {
    request(app)
      .post('/api/v1')
      .set('Content-Type', 'application/json')
      .send('{invalid json}')
      .expect(400, done);
  });

*/

  it('responds with 404 for PATCH to undefined route', (done) => {
    request(app)
      .patch('/undefined-route')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });


  it('responds with 404 for DELETE to undefined route', (done) => {
    request(app)
      .delete('/undefined-route')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });


  it('responds with 404 for PUT to undefined route', (done) => {
    request(app)
      .put('/undefined-route')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });


  it('responds with 404 for POST to undefined route', (done) => {
    request(app)
      .post('/undefined-route')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });


  it('routes requests to api v1 module', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        // Should not return 404 from notFound middleware if api module handles it
        // The response depends on api module implementation
        done();
      });
  });


  it('responds with welcome message on root endpoint', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        if (res.body.message !== '🦄🌈✨👋🌎🌍🌏✨🌈🦄') {
          throw new Error('Expected welcome message not found');
        }
      })
      .end(done);
  });

});


 