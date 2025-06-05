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
FAILED TEST: ### Analysis
The test run failed due to a timeout, likely because the second test case was not properly structured as a test function and the `done` callback was used outside of it. This caused the test runner to wait indefinitely for the test to complete.

### Recommended Fixes
1. Wrap the second test case in an `it` function to properly define the test and use the `done` callback correctly.
2. Ensure that all asynchronous operations are handled within a test function.

Here is the corrected `test/app.test.js`:

```javascript
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

  it('responds with the correct message on the root path', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe('🦄🌈✨👋🌎🌍🌏✨🌈🦄');
        done();
      })
      .catch(done);
  });
});
```

  request(app)
    .post('/')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(404, done);

*/
/*
FAILED TEST: ### Analysis
The test run failed due to a `ReferenceError: done is not defined` in `test/app.test.js`. This error occurs because the `done` callback is used outside of a test function, specifically in the second test case which is not properly structured as a test function.

### Recommended Fixes
1. Wrap the second test case in an `it` function to properly define the test and use the `done` callback correctly.
2. Ensure that all asynchronous operations are handled within a test function.

Here is the corrected `test/app.test.js`:

```javascript
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

  it('responds with the correct message on the root path', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe('🦄🌈✨👋🌎🌍🌏✨🌈🦄');
        done();
      })
      .catch(done);
  });
});
```

  request(app)
    .get('/?unexpected=value')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe('🦄🌈✨👋🌎🌍🌏✨🌈🦄');
      done();
    })
    .catch(done);

*/
/*
FAILED TEST: ### Analysis
The test run failed due to a `ReferenceError: done is not defined` in `test/app.test.js`. This error occurs because the `done` callback is used outside of a test function, specifically in the second test case which is not properly structured as a test function.

### Recommended Fixes
1. Wrap the second test case in an `it` function to properly define the test and use the `done` callback correctly.
2. Ensure that all asynchronous operations are handled within a test function.

Here is the corrected `test/app.test.js`:

```javascript
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

  it('responds with the correct message on the root path', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe('🦄🌈✨👋🌎🌍🌏✨🌈🦄');
        done();
      })
      .catch(done);
  });
});
```

  request(app)
    .get('/')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe('🦄🌈✨👋🌎🌍🌏✨🌈🦄');
      done();
    })
    .catch(done);

*/
/*
FAILED TEST: ### Analysis
The test run failed due to a `ReferenceError: done is not defined` in `test/app.test.js`. This error occurs because the `done` callback is used outside of a test function, specifically in the second test case which is not properly structured as a test function.

### Recommended Fixes
1. Wrap the second test case in an `it` function to properly define the test and use the `done` callback correctly.
2. Ensure that all asynchronous operations are handled within a test function.

Here is the corrected `test/app.test.js`:

```javascript
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

  it('responds with the correct message on the root path', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe('🦄🌈✨👋🌎🌍🌏✨🌈🦄');
        done();
      })
      .catch(done);
  });
});
```

  request(app)
    .get('/')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((response) => {
      expect(response.body.message).toBe('🦄🌈✨👋🌎🌍🌏✨🌈🦄');
      done();
    })
    .catch(done);

*/
});


 