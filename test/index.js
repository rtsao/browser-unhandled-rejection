import Ponyfill, {auto, needsPolyfill} from '../src/index.js';
import test from 'tape';

function runTestSuite(MyPromise, name) {
  test(`rejection is handled per leaf (${name})`, t => {
    t.plan(1);
    let count = 0;
    const listener = () => {
      count++;
    }
    window.addEventListener('unhandledrejection', listener);
    const promise = MyPromise.reject(new Error('rejection'));
    promise.then(() => {}).then(() => {}).then(() => {});
    promise.then(() => {}).then(() => {}).then(() => {});
    //macro-task(setTimeout) runs after microtask (Promise.resolve)
    setTimeout(() => {
      t.equal(count, 2, 'handler is called twice');
      window.removeEventListener('unhandledrejection', listener);
    }, 0);
  });

  test(`rejection of non-error works (${name})`, t => {
    t.plan(2);
    let count = 0;
    const reason = 'rejection';
    const listener = (e) => {
      count++;
      t.equal(e.reason, reason, 'reason attribute matches expected value');
    }
    window.addEventListener('unhandledrejection', listener);
    const promise = MyPromise.reject(reason);
    promise.then(() => {}).then(() => {});
    // macrotask (setTimeout) runs after microtask (Promise.resolve)
    setTimeout(() => {
      t.equal(count, 1, 'handler is called');
      window.removeEventListener('unhandledrejection', listener);
    }, 0);
  });

  test(`does not trigger event for recovered downstream (${name})`, t => {
    t.plan(1);
    let count = 0;
    const reason = 'rejection';
    const listener = (e) => {
      count++;
    }
    window.addEventListener('unhandledrejection', listener);
    const promise = MyPromise.reject(reason);
    promise.catch(() => {}).then(() => {});
    // macrotask (setTimeout) runs after microtask (Promise.resolve)
    setTimeout(() => {
      t.equal(count, 0, 'handler is not called');
      window.removeEventListener('unhandledrejection', listener);
    }, 0);
  });

  test(`unhandledrejection event shape (${name})`, t => {
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
    promise = MyPromise.reject(reason);
  });

}

// Only test ponyfill if browser doesn't have native unhandled rejection support
if (needsPolyfill()) {
  runTestSuite(Ponyfill, 'ponyfill');
}

// Test auto polyfilling last because it possibly modifies globals
auto();
runTestSuite(Promise, 'auto');
