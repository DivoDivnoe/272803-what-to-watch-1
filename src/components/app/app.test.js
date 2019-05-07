import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const mock = {
  moviesList: [`Иван Васильевич меняет профессию`, `Бриллиантовая рука`, `Джентльмены удачи`],
};

describe(`App component`, () => {
  const {moviesList} = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(<App moviesList={moviesList} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
