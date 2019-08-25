import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'router/index';
import * as serviceWorker from './serviceWorker';
import 'styles/common.scss';

ReactDOM.render(<Router />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./router/index', () => {
    ReactDOM.render(<Router />, document.getElementById('root'))
  })
}

serviceWorker.unregister();
