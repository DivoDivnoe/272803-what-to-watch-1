import React from 'react';
import {create} from 'react-test-renderer';
import FilmsList from './films-list.jsx';

const MockComponent = () => <div />;

const mock = {
  movies: [
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
