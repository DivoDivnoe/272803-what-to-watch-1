import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withCurrentFilm from './with-current-film';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withCurrentFilm(MockComponent);

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

describe(`component returned with withCurrentFilm hoc`, () => {
  it(`is rendered with right state`, () => {
    const {movies} = mock;

    const comp = mount(
        <MockComponentWrapped
          movies={movies}
        />
    );

    expect(comp.state().currentFilm).toEqual(``);
  });
});
