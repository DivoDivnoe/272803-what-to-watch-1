import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';
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
  promoFilm: {
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
  favorites: [],
  comments: [],
  isServerResponding: true,
  genres: [`All`, `Crime`, `Thriller`, `Comedy`],
  userData: {},
  onAuthUser: jest.fn(),
  onSetToFavorites: jest.fn(),
  onLoadFavorites: jest.fn(),
  onSetServerStatus: jest.fn(),
  onLoadComments: jest.fn(),
  onDeleteComments: jest.fn(),
};

describe(`App component`, () => {
  const {
    movies,
    promoFilm,
    favorites,
    comments,
    isServerResponding,
    genres,
    userData,
    onAuthUser,
    onSetToFavorites,
    onLoadFavorites,
    onSetServerStatus,
    onLoadComments,
    onDeleteComments,
  } = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <App
            movies={movies}
            promoFilm={promoFilm}
            favorites={favorites}
            comments={comments}
            isServerResponding={isServerResponding}
            genres={genres}
            userData={userData}
            onAuthUser={onAuthUser}
            onSetToFavorites={onSetToFavorites}
            onLoadFavorites={onLoadFavorites}
            onSetServerStatus={onSetServerStatus}
            onLoadComments={onLoadComments}
            onDeleteComments={onDeleteComments}
          />
        </BrowserRouter>,
        {createNodeMock: (el) => {
          return el;
        }}).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
