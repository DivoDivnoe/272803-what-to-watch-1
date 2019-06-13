import React from 'react';
import renderer from 'react-test-renderer';
import FilmPage from './film-page.jsx';
import {BrowserRouter} from 'react-router-dom';

const mock = {
  userData: {},
  favorites: [],
  film: {
    id: 1,
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
    previewImage: ``,
  },
  similarFilms: [],
  comments: [],
  history: {},
  onSwitchPlayer: jest.fn(),
  onSetToFavorites: jest.fn(),
  onLoadComments: jest.fn(),
  onDeleteComments: jest.fn(),
};

describe(`FilmPage component`, () => {
  const {
    film,
    userData,
    favorites,
    similarFilms,
    comments,
    history,
    onSwitchPlayer,
    onSetToFavorites,
    onLoadComments,
    onDeleteComments,
  } = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <BrowserRouter>
          <FilmPage
            film={film}
            userData={userData}
            similarFilms={similarFilms}
            favorites={favorites}
            comments={comments}
            history={history}
            onSwitchPlayer={onSwitchPlayer}
            onSetToFavorites={onSetToFavorites}
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
