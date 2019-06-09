import React from 'react';
import renderer from 'react-test-renderer';
import MovieHeroHead from './movie-hero-head.jsx';
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
  isMainPage: false,
};

describe(`MovieHeroHead component`, () => {
  const {
    movie,
    userData,
    isMainPage,
  } = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <MovieHeroHead
            movie={movie}
            userData={userData}
            isMainPage={isMainPage}
          />
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
