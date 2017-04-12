# browser-unhandled-rejection

[![build status][build-badge]][build-href]
[![dependencies status][deps-badge]][deps-href]
[![npm version][npm-badge]][npm-href]

A ponyfill/polyfill for browser Promise [`unhandledrejection`](https://developer.mozilla.org/en-US/docs/Web/Events/unhandledrejection) events.

See: https://www.chromestatus.com/features/4805872211460096

[![sauce labs test status][sauce-badge]][sauce-href]

## Install

```bash
npm i browser-unhandled-rejection
```
or
```bash
yarn add browser-unhandled-rejection
```

## Usage
### Automatic polyfill
This automatically applies the polyfill to the global `Promise` object if it is needed.
```js
import {auto} from 'browser-unhandled-rejection';

auto(); // Applies polyfill if necessary to window.Promise
```

### Manual polyfill
The following snippet is equivalent to `auto()`:
```js
import {polyfill} from 'browser-unhandled-rejection';

if (typeof PromiseRejectionEvent !== 'undefined') {
  polyfill(); // Polyfills window.Promise
}
```

### Ponyfill
This may may useful if you don't want to mutate `window.Promise`:
```js
import MyPromise from 'browser-unhandled-rejection';

window.addEventListener('unhandledrejection', () => {
  console.log('unhandledrejection was triggered');
});

MyPromise.reject('will trigger unhandledrejection event');

new MyPromise((resolve, reject) => {
  reject('will also trigger unhandledrejection event');
});
```

[npm-badge]: https://badge.fury.io/js/browser-unhandled-rejection.svg
[npm-href]: https://www.npmjs.com/package/browser-unhandled-rejection
[build-badge]: https://travis-ci.org/rtsao/browser-unhandled-rejection.svg?branch=master
[build-href]: https://travis-ci.org/rtsao/browser-unhandled-rejection
[deps-badge]: https://img.shields.io/badge/dependencies-none-brightgreen.svg
[deps-href]: https://david-dm.org/rtsao/browser-unhandled-rejection
[sauce-badge]: https://saucelabs.com/browser-matrix/browser-unhandled-rejection.svg
[sauce-href]: https://saucelabs.com/u/browser-unhandled-rejection
