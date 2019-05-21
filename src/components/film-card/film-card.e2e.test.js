import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FilmCard from './film-card.jsx';

configure({adapter: new Adapter()});

const mock = {
  movie: {
    title: `Иван Васильевич меняет профессию`,
    image: `https://vokrug.tv/pic/news/d/d/8/4/dd84fb57fee799d831753daa2e0eb07e.jpg`,
    genre: `comedy`,
    preview: ``,
  },
  clickHandler: jest.fn(),
  handlePreview: jest.fn(),
  stopPreview: jest.fn(),
  isPlaying: false,
};

describe(`FilmCard component`, () => {
  it(`handles correctly mouseenter event`, (done) => {
    const {movie, clickHandler, handlePreview, stopPreview, isPlaying} = mock;

    const filmCard = mount(
        <FilmCard
          movie={movie}
          clickHandler={clickHandler}
          handlePreview={handlePreview}
          stopPreview={stopPreview}
          isPlaying={isPlaying}
        />,
        {createNodeMock: (el) => {
          return el;
        }}
    );

    filmCard.setState({isLoading: false});
    filmCard.find(`article`).simulate(`mouseenter`);

    setTimeout(() => {
      expect(handlePreview).toHaveBeenCalledWith(movie.title);
      done();
    }, 1000);
  });
});
