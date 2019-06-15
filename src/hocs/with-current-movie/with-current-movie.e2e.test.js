import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withCurrentMovie from './with-current-movie';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withCurrentMovie(MockComponent);

const mock = {
  movies: [
    {
      id: 1,
      name: `Fantastic Beasts`,
      posterImage: ``,
      description: `very interesting film`,
      director: `Steven Spielberg`,
      starring: [`Andrey Ivanov`, `Sergey Rubets`],
      rating: 10,
      scoresCount: 100000,
      backgroundImage: ``,
      backgroundColor: `cyan`,
      released: 2019,
      genre: `Comedy`,
      previewVideoLink: ``,
      previewImage: ``,
      videoLink: ``,
      runTime: 600,
      isFavorite: false,
    },
    {
      id: 2,
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
      videoLink: ``,
      runTime: 600,
      isFavorite: false,
    },
  ],
  match: {
    params: {
      id: 1,
    }
  }
};

describe(`component returned with withCurrentMovie hoc`, () => {
  it(`is rendered with right state`, () => {
    const {movies, match} = mock;

    const comp = mount(
        <MockComponentWrapped movies={movies} match={match} />
    );

    expect(comp.state().film).toEqual(movies[0]);
    expect(comp.state().similarFilms).toEqual([movies[1]]);
  });
});
