import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import movies from './mocks/films';

const init = () => {
  const root = document.querySelector(`#root`);

  ReactDOM.render(<App movies={movies} />, root);
};

init();
