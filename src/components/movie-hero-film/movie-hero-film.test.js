import React from 'react';
import renderer from 'react-test-renderer';
import MovieHeroFilm from './movie-hero-film.jsx';
import {BrowserRouter} from 'react-router-dom';

const mock = {
  movie: {
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
  userData: {},
  tab: `Details`,
  isInList: false,
  comments: [],
  renderTabs: jest.fn(),
  onSwitchPlayer: jest.fn(),
  onSetToFavorites: jest.fn(),
  onLoadComments: jest.fn(),
  onDeleteComments: jest.fn(),
};

describe(`MovieHeroFilm component`, () => {
  const {
    movie,
    userData,
    tab,
    isInList,
    comments,
    renderTabs,
    onSwitchPlayer,
    onLoadComments,
    onDeleteComments,
    onSetToFavorites,
  } = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <MovieHeroFilm
            movie={movie}
            userData={userData}
            tab={tab}
            isInList={isInList}
            comments={comments}
            renderTabs={renderTabs}
            onSwitchPlayer={onSwitchPlayer}
            onLoadComments={onLoadComments}
            onSetToFavorites={onSetToFavorites}
            onDeleteComments={onDeleteComments}

          />
        </BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
