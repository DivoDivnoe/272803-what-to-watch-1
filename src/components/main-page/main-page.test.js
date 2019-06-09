import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';
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
  genres: [`All`, `Crime`, `Thriller`],
  userData: {},
  isPlayerActive: false,
  switchPlayer: jest.fn(),
  setToFavoritesHandler: jest.fn(),
  history: {},
};

describe(`MainPage component`, () => {
  const {
    movies,
    promoFilm,
    favorites,
    genres,
    userData,
    isPlayerActive,
    switchPlayer,
    setToFavoritesHandler,
    history,
  } = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <MainPage
            movies={movies}
            promoFilm={promoFilm}
            favorites={favorites}
            genres={genres}
            userData={userData}
            isPlayerActive={isPlayerActive}
            switchPlayer={switchPlayer}
            setToFavoritesHandler={setToFavoritesHandler}
            history={history}
          />
        </BrowserRouter>,
        {createNodeMock: (el) => {
          return el;
        }}).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
