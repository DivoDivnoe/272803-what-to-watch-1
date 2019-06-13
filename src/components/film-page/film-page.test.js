import React from 'react';
import renderer from 'react-test-renderer';
import FilmPage from './film-page.jsx';
import {BrowserRouter} from 'react-router-dom';

const mock = {
  movies: [
    {
      id: 3,
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
      id: 2,
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
  film: {
    id: 1,
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
  userData: {},
  favorites: [],
  match: {
    params: {id: 1},
  },
  genre: `All`,
  genres: [`All`, `Crime`, `Thriller`],
  switchPlayer: jest.fn(),
  authUserHandler: jest.fn(),
  setToFavoritesHandler: jest.fn(),
  history: {},
};

describe(`FilmPage component`, () => {
  const {
    film,
    userData,
    favorites,
    match,
    genre,
    genres,
    switchPlayer,
    authUserHandler,
    setToFavoritesHandler,
    history,
    isPlayerActive,
    movies,
  } = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <FilmPage
            film={film}
            similarFilms={movies}
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
