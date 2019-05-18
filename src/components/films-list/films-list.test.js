import React from 'react';
import {create} from 'react-test-renderer';
import FilmsList from './films-list.jsx';

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
  clickHandler: jest.fn(),
};

describe(`FilmCard component`, () => {
  it(`renders correctly`, () => {
    const {movies, clickHandler} = mock;

    const tree = create(
        <FilmsList
          movies={movies}
          clickHandler={clickHandler}
        />,
        {createNodeMock: (el) => {
          return el;
        }}).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
