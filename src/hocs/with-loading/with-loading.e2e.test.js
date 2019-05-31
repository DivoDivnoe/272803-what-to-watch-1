import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withLoading from './with-loading';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withLoading(MockComponent);

const mock = {
  movie: {
    name: `Major Payne`,
    posterImage: ``,
    genre: `Comedy`,
    previewVideoLink: ``,
  },
  handlePreview: jest.fn(),
  stopPreview: jest.fn(),
  isPlaying: false,
};

describe(`component returned with withLoading hoc`, () => {
  it(`is rendered with right state`, () => {
    const {movie, handlePreview, stopPreview, isPlaying} = mock;

    const comp = mount(
        <MockComponentWrapped
          movie={movie}
          handlePreview={handlePreview}
          stopPreview={stopPreview}
          isPlaying={isPlaying}
        />
    );

    expect(comp.state().isLoading).toEqual(true);
  });
});
