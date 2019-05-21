import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const mock = {
  movies: [
    {
      title: `Fantastic Beasts`,
      image: ``,
      genre: `comedy`,
      preview: ``,
    },
    {
      title: `Major Payne`,
      image: ``,
      genre: `comedy`,
      preview: ``,
    },
  ],
};

describe(`App component`, () => {
  const {movies} = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <App movies={movies} />,
        {createNodeMock: (el) => {
          return el;
        }}).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
