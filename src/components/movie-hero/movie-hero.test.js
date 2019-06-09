import React from 'react';
import renderer from 'react-test-renderer';
import MovieHero from './movie-hero.jsx';
import {BrowserRouter} from 'react-router-dom';

const mock = {
  movie: {
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
  },
  userData: {},
  switchPlayer: jest.fn(),
  setToFavoritesHandler: jest.fn(),
  isInList: true,
};

describe(`MovieHero component`, () => {
  const {
    movie,
    userData,
    switchPlayer,
    setToFavoritesHandler,
    isInList,
  } = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <MovieHero
            movie={movie}
            userData={userData}
            switchPlayer={switchPlayer}
            setToFavoritesHandler={setToFavoritesHandler}
            isInList={isInList}
          />
        </BrowserRouter>,
        {createNodeMock: (el) => {
          return el;
        }}).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
