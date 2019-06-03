import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import App from './components/app/app.jsx';
import reducer from './reducer/index';
import {Operation} from './reducer/data/data';
import {appGenres} from './mocks/films';
import createAPI from './api';

const api = createAPI();

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

store.dispatch(Operation.loadFilms());

const init = () => {
  const root = document.querySelector(`#root`);

  ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App genres={appGenres} />
        </BrowserRouter>
      </Provider>,
      root
  );
};

init();
