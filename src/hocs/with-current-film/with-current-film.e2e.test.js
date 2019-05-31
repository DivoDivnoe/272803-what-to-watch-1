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
