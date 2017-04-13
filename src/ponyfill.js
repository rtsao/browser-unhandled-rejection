const OriginalPromise = window.Promise;

/**
 * ES5 subclassing is used per:
 * https://github.com/rtsao/browser-unhandled-rejection/issues/1
 * https://kangax.github.io/compat-table/es6/#test-Promise_is_subclassable
 *
 * Adapted from: https://gist.github.com/domenic/8ed6048b187ee8f2ec75
 */
const InstrumentedPromise = function Promise(resolver) {
  if (!(this instanceof InstrumentedPromise)) {
    throw new TypeError('Cannot call a class as a function');
  }
  const promise = new OriginalPromise((resolve, reject) =>
    resolver(resolve, arg => {
      OriginalPromise.resolve().then(() => {
        if (promise._handled !== true) {
          dispatchUnhandledRejectionEvent(promise, arg);
        }
      });
      return reject(arg);
    }));
  promise.__proto__ = InstrumentedPromise.prototype;
  return promise;
};

InstrumentedPromise.__proto__ = OriginalPromise;
InstrumentedPromise.prototype.__proto__ = OriginalPromise.prototype;

InstrumentedPromise.prototype.then = function then(onFulfilled, onRejected) {
  return OriginalPromise.prototype.then.call(this, onFulfilled, arg => {
    this._handled = true;
    return onRejected(arg);
  });
};

function dispatchUnhandledRejectionEvent(promise, reason) {
  const event = document.createEvent('Event');
  /**
   * Note: these properties should not be enumerable, which is the default setting
   */
  Object.defineProperties(event, {
    promise: {
      value: promise,
      writable: false
    },
    reason: {
      value: reason,
      writable: false
    }
  });
  event.initEvent(
    'unhandledrejection', // Define that the event name is 'unhandledrejection'
    false, // PromiseRejectionEvent is not bubbleable
    true // PromiseRejectionEvent is cancelable
  );
  window.dispatchEvent(event);
}

export default InstrumentedPromise;
