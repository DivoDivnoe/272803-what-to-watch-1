import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const moviesList = [`Fantastic Beasts`, `Happy Gilmore`, `Major Payne`, `Mission: Impossible`];

const init = () => {
  const root = document.querySelector(`#root`);

  ReactDOM.render(<App moviesList={moviesList} />, root);
};

init();
