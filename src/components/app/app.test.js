import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';
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
  promoFilm: {
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
  favorites: [],
  genre: `All`,
  genres: [`All`, `Crime`, `Thriller`],
  userData: {},
  authUserHandler: jest.fn(),
  checkIsAuthUser: jest.fn(),
  setToFavoritesHandler: jest.fn(),
  loadFavorites: jest.fn(),
};

describe(`App component`, () => {
  const {
    movies,
    promoFilm,
    favorites,
    genre,
    genres,
    userData,
    authUserHandler,
    checkIsAuthUser,
    setToFavoritesHandler,
    loadFavorites,
  } = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <App
            movies={movies}
            promoFilm={promoFilm}
            favorites={favorites}
            genre={genre}
            genres={genres}
            userData={userData}
            authUserHandler={authUserHandler}
            checkIsAuthUser={checkIsAuthUser}
            setToFavoritesHandler={setToFavoritesHandler}
            loadFavorites={loadFavorites}
          />
        </BrowserRouter>,
        {createNodeMock: (el) => {
          return el;
        }}).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
