import React from 'react';
import renderer from 'react-test-renderer';
import MovieHeroFilm from './movie-hero-film.jsx';
import {BrowserRouter} from 'react-router-dom';

const mock = {
  movie: {
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
  },
  userData: {},
  switchPlayer: jest.fn(),
  renderTabs: jest.fn(),
  id: 1,
  tab: `Details`,
  setToFavoritesHandler: jest.fn(),
  isInList: false,
};

describe(`MovieHeroFilm component`, () => {
  const {
    movie,
    userData,
    switchPlayer,
    renderTabs,
    id,
    tab,
    setToFavoritesHandler,
    isInList,
  } = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <MovieHeroFilm
            movie={movie}
            switchPlayer={switchPlayer}
            userData={userData}
            renderTabs={renderTabs}
            tab={tab}
            setToFavoritesHandler={setToFavoritesHandler}
            id={id}
            isInList={isInList}
          />
        </BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
