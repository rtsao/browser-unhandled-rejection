import InstrumentedPromise from './promise.js';

export default InstrumentedPromise;

export function needsPolyfill() {
  return typeof PromiseRejectionEvent === 'undefined';
}

export function polyfill() {
  Promise = InstrumentedPromise;
}

export function auto() {
  if (needsPolyfill()) {
    polyfill();
  }
}
