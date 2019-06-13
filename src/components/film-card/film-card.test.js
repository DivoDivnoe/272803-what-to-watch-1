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
  onStartPreview: jest.fn(),
  onStopPreview: jest.fn(),
  isLoading: false,
};

describe(`FilmCard component`, () => {
  it(`renders correctly`, () => {
    const {movie, onStartPreview, onStopPreview, isLoading} = mock;

    const tree = create(
        <BrowserRouter>
          <FilmCard
            movie={movie}
            isLoading={isLoading}
            renderPlayer={renderPlayer}
            onStartPreview={onStartPreview}
            onStopPreview={onStopPreview}
          />
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
