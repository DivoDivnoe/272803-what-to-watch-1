import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withLoading from './with-loading';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withLoading(MockComponent);

const mock = {
  movie: {
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
  isPlaying: false,
  isFull: true,
};

describe(`component returned with withLoading hoc`, () => {
  it(`is rendered with right state`, () => {
    const {movie, isFull, isPlaying} = mock;

    const comp = mount(
        <MockComponentWrapped
          movie={movie}
          isPlaying={isPlaying}
          isFull={isFull}
        />
    );

    expect(comp.state().isLoading).toEqual(true);
  });
});
