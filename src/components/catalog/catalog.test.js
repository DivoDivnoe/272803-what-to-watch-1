import React from 'react';
import {create} from 'react-test-renderer';
import Catalog from './catalog.jsx';

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
  renderTabs: jest.fn(),
};

describe(`Catalog component`, () => {
  it(`renders correctly`, () => {
    const {movies, renderTabs} = mock;

    const tree = create(
        <Catalog
          movies={movies}
          renderTabs={renderTabs}
          renderButton={() => <MockComponent />}
        />,
        {createNodeMock: (el) => {
          return el;
        }}).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
