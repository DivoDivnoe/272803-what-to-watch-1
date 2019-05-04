import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const init = () => {
  const root = document.querySelector(`#root`);
  ReactDOM.render(<App />, root);
};

init();
