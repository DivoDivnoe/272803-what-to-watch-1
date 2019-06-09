import React from 'react';
import {create} from 'react-test-renderer';
import FilmCard from './film-card.jsx';
import {BrowserRouter} from 'react-router-dom';

const MockComponent = () => <div />;
const renderPlayer = () => <MockComponent />;

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
  handlePreview: jest.fn(),
  stopPreview: jest.fn(),
  isLoading: false,
};

describe(`FilmCard component`, () => {
  it(`renders correctly`, () => {
    const {movie, handlePreview, stopPreview, isLoading} = mock;

    const tree = create(
        <BrowserRouter>
          <FilmCard
            movie={movie}
            renderPlayer={renderPlayer}
            handlePreview={handlePreview}
            stopPreview={stopPreview}
            isLoading={isLoading}
          />
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
