import React from 'react';
import {create} from 'react-test-renderer';
import FilmsList from './films-list.jsx';

const MockComponent = () => <div />;

const mock = {
  movies: [
    {
      title: `Fantastic Beasts`,
      image: ``,
      genre: `comedy`,
      preview: ``,
    },
    {
      title: `Major Payne`,
      image: ``,
      genre: `comedy`,
      preview: ``,
    },
  ],
};

describe(`FilmsList component`, () => {
  it(`renders correctly`, () => {
    const {movies} = mock;

    const tree = create(
        <FilmsList
          movies={movies}
          renderFilmCard={(movie) => <MockComponent key={movie.title} />}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
