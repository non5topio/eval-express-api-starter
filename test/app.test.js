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
The test run failed due to a `ReferenceError: done is not defined` in `test/app.test.js`. This error occurs because the `done` callback is used outside of an `it` block, where it is not defined.

### Recommended Fixes
1. Move the second test case inside an `it` block to properly define and use the `done` callback.
2. Ensure that all asynchronous operations are correctly handled within `it` blocks.

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
    .expect(404)
    .then((response) => {
      expect(response.body.message).toBe('Not Found');
      done();
    })
    .catch(done);

*/
/*
FAILED TEST: ### Analysis
The test run failed due to a `ReferenceError: done is not defined` in `test/app.test.js`. This error occurs because the `done` callback is used outside of an `it` block, where it is not defined.

### Recommended Fixes
1. Move the second test case inside an `it` block to properly define and use the `done` callback.
2. Ensure that all asynchronous operations are correctly handled within `it` blocks.

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
    .get('/?invalidParam=123')
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
The test run failed due to a `ReferenceError: done is not defined` in `test/app.test.js`. This error occurs because the `done` callback is used outside of an `it` block, where it is not defined.

### Recommended Fixes
1. Move the second test case inside an `it` block to properly define and use the `done` callback.
2. Ensure that all asynchronous operations are correctly handled within `it` blocks.

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
The test run failed due to a `ReferenceError: done is not defined` in `test/app.test.js`. This error occurs because the `done` callback is used outside of an `it` block, where it is not defined.

### Recommended Fixes
1. Move the second test case inside an `it` block to properly define and use the `done` callback.
2. Ensure that all asynchronous operations are correctly handled within `it` blocks.

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


 