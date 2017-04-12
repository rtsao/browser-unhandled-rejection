import {auto} from '../src/index.js';
import test from 'tape';

test('auto polyfill works', t => {
  t.plan(1);
  window.addEventListener('unhandledrejection', () => {
    t.pass('unhandledrejection event fired');
  });
  auto();
  Promise.reject('rejection');
});
