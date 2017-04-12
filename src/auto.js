import {polyfill} from './polyfill.js';

export function auto() {
  if (typeof PromiseRejectionEvent !== 'undefined') {
    polyfill();
  }
}
