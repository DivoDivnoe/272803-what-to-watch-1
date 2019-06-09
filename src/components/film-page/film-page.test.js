import React from 'react';
import renderer from 'react-test-renderer';
import FilmPage from './film-page.jsx';
import {BrowserRouter} from 'react-router-dom';

const mock = {
  movies: [
    {
      name: `Fantastic Beasts`,
      description: `very interesting film`,
      director: `Steven Spielberg`,
      starring: [`Andrey Ivanov`, `Sergey Rubets`],
      rating: 10,
      scoresCount: 100000,
      backgroundImage: ``,
      backgroundColor: `cyan`,
      released: 2019,
      posterImage: ``,
      genre: `Comedy`,
      previewVideoLink: ``,
      previewImage: ``,
    },
    {
      name: `Major Payne`,
      description: `very interesting film`,
      director: `Steven Spielberg`,
      starring: [`Andrey Ivanov`, `Sergey Rubets`],
      rating: 10,
      scoresCount: 100000,
      backgroundImage: ``,
      backgroundColor: `cyan`,
      released: 2019,
      posterImage: ``,
      genre: `Comedy`,
      previewVideoLink: ``,
      previewImage: ``,
    },
  ],
  userData: {},
  favorites: [],
  match: {
    params: {id: 1},
  },
  genre: `All`,
  genres: [`All`, `Crime`, `Thriller`],
  switchPlayer: jest.fn(),
  authUserHandler: jest.fn(),
  isPlayerActive: false,
  setToFavoritesHandler: jest.fn(),
  history: {},
};

describe(`FilmPage component`, () => {
  const {
    movies,
    userData,
    favorites,
    match,
    genre,
    genres,
    switchPlayer,
    authUserHandler,
    setToFavoritesHandler,
    history,
    isPlayerActive
  } = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <FilmPage
            movies={movies}
            favorites={favorites}
            match={match}
            genre={genre}
            genres={genres}
            switchPlayer={switchPlayer}
            userData={userData}
            authUserHandler={authUserHandler}
            setToFavoritesHandler={setToFavoritesHandler}
            history={history}
            isPlayerActive={isPlayerActive}
          />
        </BrowserRouter>,
        {createNodeMock: (el) => {
          return el;
        }}).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
