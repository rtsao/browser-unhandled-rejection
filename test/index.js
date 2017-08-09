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

test('rejection is handled per leaf', t => {
  t.plan(1);
  let count = 0;
  const listener = () => {
    count++;
  }
  window.addEventListener('unhandledrejection', listener);
  auto();
  const promise = Promise.reject(new Error('rejection'));
  promise.then(() => {}).then(() => {}).then(() => {});
  promise.then(() => {}).then(() => {}).then(() => {});
  //macro-task(setTimeout) runs after microtask (Promise.resolve)
  setTimeout(() => {
    t.equal(count, 2, 'handler is called twice');
    window.removeEventListener('unhandledrejection', listener);
  }, 0);
});

test('rejection of non-error works', t => {
  t.plan(2);
  let count = 0;
  const reason = 'rejection';
  const listener = (e) => {
    count++;
    t.equal(e.reason, reason, 'reason attribute matches expected value');
  }
  window.addEventListener('unhandledrejection', listener);
  auto();
  const promise = Promise.reject(reason);
  promise.then(() => {}).then(() => {});
  //macro-task(setTimeout) runs after microtask (Promise.resolve)
  setTimeout(() => {
    t.equal(count, 1, 'handler is called');
    window.removeEventListener('unhandledrejection', listener);
  }, 0);
});
