import React from 'react';
import {create} from 'react-test-renderer';
import FilmDetails from './film-details.jsx';

const mock = {
  film: {
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
};

describe(`FilmDetails component`, () => {
  it(`renders correctly`, () => {
    const {film} = mock;

    const tree = create(
        <FilmDetails film={film} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
