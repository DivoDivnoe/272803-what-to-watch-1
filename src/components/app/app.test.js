import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

const mock = {
  movies: [
    {
      name: `Fantastic Beasts`,
      posterImage: ``,
      genre: `Comedy`,
      previewVideoLink: ``,
    },
    {
      name: `Major Payne`,
      posterImage: ``,
      genre: `Comedy`,
      previewVideoLink: ``,
    },
  ],
  genre: `All`,
  filterGenreHandler: jest.fn(),
  genres: [`All`, `Crime`, `Thriller`],
};

describe(`App component`, () => {
  const {movies, genre, filterGenreHandler, genres} = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <App
          movies={movies}
          genre={genre}
          filterGenreHandler={filterGenreHandler}
          genres={genres}
        />,
        {createNodeMock: (el) => {
          return el;
        }}).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
