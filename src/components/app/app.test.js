import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const mock = {
  movies: [
    {
      title: `Fantastic Beasts`,
      image: ``,
      genre: `comedy`,
    },
    {
      title: `Major Payne`,
      image: ``,
      genre: `comedy`,
    },
  ],
};

describe(`App component`, () => {
  const {movies} = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(<App movies={movies} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
