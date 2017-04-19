import {auto} from '../src/index.js';
import test from 'tape';

test('auto polyfill works', t => {
  t.plan(4);
  const reason = 'rejection';
  let promise;
  const listener = (e) => {
    t.pass('unhandledrejection event fired');
    /**
     * Test attributes according to:
     * https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections
     */
    t.equal(e.reason, reason, 'reason attribute matches expected value');
    t.equal(e.promise, promise, 'promise attribute matches expected value');
    t.equal(e.cancelable, true, 'cancelable attribute is true');
    window.removeEventListener('unhandledrejection', listener);
  }
  window.addEventListener('unhandledrejection', listener);
  auto();
  promise = Promise.reject(reason);
});
