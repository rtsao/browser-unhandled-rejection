import InstrumentedPromise from './ponyfill.js';

export function polyfill() {
  window.Promise = InstrumentedPromise;
}
