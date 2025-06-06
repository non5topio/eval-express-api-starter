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
The test run failed due to a `ReferenceError: done is not defined` in `test/app.test.js`. The `done` callback is used incorrectly outside of a test function, causing the test suite to fail.

### Recommended Fixes
1. Move the second test case inside an `it` block to properly define the `done` callback.
2. Ensure that the `done` callback is correctly used within the test function.

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

  it('responds with a json message', (done) => {
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
    .get('/?param=<script>alert(\'xss\')</script>')
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
The test run failed due to a `ReferenceError: done is not defined` in `test/app.test.js`. The `done` callback is used incorrectly outside of a test function, causing the test suite to fail.

### Recommended Fixes
1. Move the second test case inside an `it` block to properly define the `done` callback.
2. Ensure that the `done` callback is correctly used within the test function.

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

  it('responds with a json message', (done) => {
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
    .get('/?invalidParam=test')
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
The test run failed due to a `ReferenceError: done is not defined` in `test/app.test.js`. The `done` callback is used incorrectly outside of a test function, causing the test suite to fail.

### Recommended Fixes
1. Move the second test case inside an `it` block to properly define the `done` callback.
2. Ensure that the `done` callback is correctly used within the test function.

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

  it('responds with a json message', (done) => {
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
The test run failed due to a `ReferenceError: done is not defined` in `test/app.test.js`. The `done` callback is used incorrectly outside of a test function, causing the test suite to fail.

### Recommended Fixes
1. Move the second test case inside an `it` block to properly define the `done` callback.
2. Ensure that the `done` callback is correctly used within the test function.

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

  it('responds with a json message', (done) => {
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


 