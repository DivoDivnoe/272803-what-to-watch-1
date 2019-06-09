import React from 'react';
import {create} from 'react-test-renderer';
import FilmOverview from './film-overview.jsx';

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

describe(`FilmOverview component`, () => {
  it(`renders correctly`, () => {
    const {film} = mock;

    const tree = create(
        <FilmOverview film={film} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
