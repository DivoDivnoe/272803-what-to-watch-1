import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';
import {BrowserRouter} from 'react-router-dom';

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
  userData: {},
};

describe(`App component`, () => {
  const {
    movies,
    genre,
    filterGenreHandler,
    genres,
    userData,
  } = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <MainPage
            movies={movies}
            genre={genre}
            filterGenreHandler={filterGenreHandler}
            genres={genres}
            userData={userData}
          />
        </BrowserRouter>,
        {createNodeMock: (el) => {
          return el;
        }}).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
