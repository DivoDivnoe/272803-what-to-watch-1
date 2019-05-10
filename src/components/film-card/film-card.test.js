import React from 'react';
import {create} from 'react-test-renderer';
import FilmCard from './film-card.jsx';

const mock = {
  movie: {
    title: `Иван Васильевич меняет профессию`,
    image: `https://vokrug.tv/pic/news/d/d/8/4/dd84fb57fee799d831753daa2e0eb07e.jpg`,
    genre: `comedy`,
  },
  clickHandler: jest.fn(),
  handlePreview: jest.fn(),
  stopPreview: jest.fn(),
};

describe(`FilmCard component`, () => {
  it(`renders correctly`, () => {
    const {movie, clickHandler, handlePreview, stopPreview} = mock;

    const tree = create(
        <FilmCard
          movie={movie}
          clickHandler={clickHandler}
          handlePreview={handlePreview}
          stopPreview={stopPreview}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
