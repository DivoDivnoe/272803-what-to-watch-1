import React from 'react';
import {create} from 'react-test-renderer';
import Favorites from './favorites.jsx';
import {BrowserRouter} from 'react-router-dom';

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
  userData: {},
  loadFavoritesHandler: jest.fn(),
};

describe(`Favorites component`, () => {
  it(`renders correctly`, () => {
    const {movies, userData, loadFavoritesHandler} = mock;

    const tree = create(
        <BrowserRouter>
          <Favorites
            movies={movies}
            userData={userData}
            loadFavoritesHandler={loadFavoritesHandler}
          />
        </BrowserRouter>,
        {createNodeMock: (el) => {
          return el;
        }}).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
