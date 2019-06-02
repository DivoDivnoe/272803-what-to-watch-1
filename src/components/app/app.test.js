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
  isAuthorizationRequired: false,
  userData: null,
  authUserHandler: jest.fn(),
  changeAuthStatus: jest.fn(),
};

describe(`App component`, () => {
  const {
    movies,
    genre,
    filterGenreHandler,
    genres,
    isAuthorizationRequired,
    userData,
    authUserHandler,
    changeAuthStatus
  } = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <App
          movies={movies}
          genre={genre}
          filterGenreHandler={filterGenreHandler}
          genres={genres}
          isAuthorizationRequired={isAuthorizationRequired}
          userData={userData}
          authUserHandler={authUserHandler}
          changeAuthStatus={changeAuthStatus}
        />,
        {createNodeMock: (el) => {
          return el;
        }}).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
