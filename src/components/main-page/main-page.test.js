import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';
import {BrowserRouter} from 'react-router-dom';

const mock = {
  movies: [
    {
      id: 1,
      name: `Fantastic Beasts`,
      posterImage: ``,
      description: `very interesting film`,
      director: `Steven Spielberg`,
      starring: [`Andrey Ivanov`, `Sergey Rubets`],
      rating: 10,
      scoresCount: 100000,
      backgroundImage: ``,
      backgroundColor: `cyan`,
      released: 2019,
      genre: `Comedy`,
      previewVideoLink: ``,
      previewImage: ``,
      videoLink: ``,
      runTime: 600,
      isFavorite: false,
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
      videoLink: ``,
      runTime: 600,
      isFavorite: false,
    },
  ],
  film: {
    id: 3,
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
    videoLink: ``,
    runTime: 600,
    isFavorite: false,
  },
  genres: [`All`, `Crime`, `Thriller`],
  userData: {},
  favorites: [],
  history: {},
  onSwitchPlayer: jest.fn(),
  onSetToFavorites: jest.fn(),
};

describe(`MainPage component`, () => {
  const {
    movies,
    film,
    favorites,
    genres,
    userData,
    onSwitchPlayer,
    onSetToFavorites,
    history,
  } = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <MainPage
            movies={movies}
            film={film}
            favorites={favorites}
            genres={genres}
            userData={userData}
            onSwitchPlayer={onSwitchPlayer}
            onSetToFavorites={onSetToFavorites}
            history={history}
          />
        </BrowserRouter>,
        {createNodeMock: (el) => {
          return el;
        }}).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
