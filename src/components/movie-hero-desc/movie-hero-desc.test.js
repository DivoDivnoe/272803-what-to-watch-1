import React from 'react';
import renderer from 'react-test-renderer';
import MovieHeroDesc from './movie-hero-desc.jsx';
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
  reviewsLinkRequired: true,
  isInList: true,
  onSwitchPlayer: jest.fn(),
  onSetToFavorites: jest.fn(),
};

describe(`MovieHeroDesc component`, () => {
  const {
    movie,
    reviewsLinkRequired,
    isInList,
    onSwitchPlayer,
    onSetToFavorites,
  } = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <MovieHeroDesc
            movie={movie}
            reviewsLinkRequired={reviewsLinkRequired}
            isInList={isInList}
            onSwitchPlayer={onSwitchPlayer}
            onSetToFavorites={onSetToFavorites}
          />
        </BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
