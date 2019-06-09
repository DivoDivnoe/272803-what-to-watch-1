import React from 'react';
import {create} from 'react-test-renderer';
import Favorites from './favorites.jsx';
import {BrowserRouter} from 'react-router-dom';

const mock = {
  favorites: [
    {
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
    {
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
    },
  ],
  userData: {},
};

describe(`Favorites component`, () => {
  it(`renders correctly`, () => {
    const {favorites, userData} = mock;

    const tree = create(
        <BrowserRouter>
          <Favorites
            favorites={favorites}
            userData={userData}
          />
        </BrowserRouter>,
        {createNodeMock: (el) => {
          return el;
        }}).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
