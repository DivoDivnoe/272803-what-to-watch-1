import React from 'react';
import renderer from 'react-test-renderer';
import MovieHeroDesc from './movie-hero-desc.jsx';
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
  switchPlayer: jest.fn(),
  reviewsLinkRequired: true,
  isInList: true,
  setToFavoritesHandler: jest.fn(),
};

describe(`MovieHeroDesc component`, () => {
  const {
    movie,
    switchPlayer,
    reviewsLinkRequired,
    isInList,
    setToFavoritesHandler,
  } = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <MovieHeroDesc
            movie={movie}
            switchPlayer={switchPlayer}
            reviewsLinkRequired={reviewsLinkRequired}
            setToFavoritesHandler={setToFavoritesHandler}
            isInList={isInList}
          />
        </BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
