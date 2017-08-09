// This is the adapter for A+ compliance test suite

const Promise = require('../dist/bundle.cjs').default;

module.exports = {
  resolveed(value) {
    return Promise.resolve(value);
  },
  rejected(reason) {
    return Promise.reject(reason);
  },
  deferred() {
    let resolve, reject;
    const promise = new Promise((_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
    });
    return {promise, resolve, reject};
  }
};
