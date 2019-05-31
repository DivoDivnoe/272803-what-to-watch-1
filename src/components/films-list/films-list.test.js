import React from 'react';
import {create} from 'react-test-renderer';
import FilmsList from './films-list.jsx';

const MockComponent = () => <div />;

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
};

describe(`FilmsList component`, () => {
  it(`renders correctly`, () => {
    const {movies} = mock;

    const tree = create(
        <FilmsList
          movies={movies}
          renderFilmCard={(movie) => <MockComponent key={movie.name} />}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
