import React from 'react';
import {create} from 'react-test-renderer';
import FilmCard from './film-card.jsx';

const MockComponent = () => <div />;
const renderPlayer = () => <MockComponent />;

const mock = {
  movieTitle: `Иван Васильевич меняет профессию`,
  handlePreview: jest.fn(),
  stopPreview: jest.fn(),
  isLoading: false,
};

describe(`FilmCard component`, () => {
  it(`renders correctly`, () => {
    const {movieTitle, handlePreview, stopPreview, isLoading} = mock;

    const tree = create(
        <FilmCard
          movieTitle={movieTitle}
          renderPlayer={renderPlayer}
          handlePreview={handlePreview}
          stopPreview={stopPreview}
          isLoading={isLoading}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
