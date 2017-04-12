import BrowserUnhandledRejection from './src/index.js';
import test from 'tape';

test('auto polyfill works', () => {
  t.plan(1);
  window.addEventListener('unhandledrejection', () => {
    t.pass('unhandledrejection event fired');
  });
  BrowserUnhandledRejection.auto();
});
