import React from 'react';
import renderer from 'react-test-renderer';
import MovieHero from './movie-hero.jsx';
import {BrowserRouter} from 'react-router-dom';

const mock = {
  movie: {
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
  userData: {},
  isInList: true,
  onSwitchPlayer: jest.fn(),
  onSetToFavorites: jest.fn(),
};

describe(`MovieHero component`, () => {
  const {
    movie,
    userData,
    isInList,
    onSwitchPlayer,
    onSetToFavorites,
  } = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <MovieHero
            movie={movie}
            userData={userData}
            isInList={isInList}
            onSwitchPlayer={onSwitchPlayer}
            onSetToFavorites={onSetToFavorites}
          />
        </BrowserRouter>,
        {createNodeMock: (el) => {
          return el;
        }}).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
