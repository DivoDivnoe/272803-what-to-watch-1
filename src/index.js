import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import movies from './mocks/films';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './reducer/reducer';

const store = createStore(reducer);

const init = () => {
  const root = document.querySelector(`#root`);

  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      root
  );
};

init();
