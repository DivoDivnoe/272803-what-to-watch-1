import React from 'react';
import {create} from 'react-test-renderer';
import Catalog from './catalog.jsx';
import {BrowserRouter} from 'react-router-dom';

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
      previewImage: ``,
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
      previewImage: ``,
    },
  ],
  renderTabs: jest.fn(),
  extraClassName: `someClass`,
};

describe(`Catalog component`, () => {
  it(`renders correctly`, () => {
    const {movies, renderTabs} = mock;

    const tree = create(
        <BrowserRouter>
          <Catalog
            movies={movies}
            renderTitle={() => <h2>Some Title</h2>}
            renderTabs={renderTabs}
            renderButton={() => <MockComponent />}
          />
        </BrowserRouter>,
        {createNodeMock: (el) => {
          return el;
        }}).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
