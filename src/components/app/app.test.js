import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

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
  genre: `all`,
  filterGenreHandler: jest.fn(),
};

describe(`App component`, () => {
  const {movies, genre, filterGenreHandler} = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <App movies={movies} genre={genre} filterGenreHandler={filterGenreHandler} />,
        {createNodeMock: (el) => {
          return el;
        }}).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
