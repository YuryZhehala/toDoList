import React, { Component } from 'react';
import { render } from 'react-dom';

import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers/index.js';

let store = createStore(todoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
