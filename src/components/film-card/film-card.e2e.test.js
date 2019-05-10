import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FilmCard from './film-card.jsx';

configure({adapter: new Adapter()});

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
  it(`reacts correctly to clicking the play button`, () => {
    const {movie, clickHandler, handlePreview, stopPreview} = mock;

    const filmCard = shallow(
        <FilmCard
          movie={movie}
          clickHandler={clickHandler}
          handlePreview={handlePreview}
          stopPreview={stopPreview}
        />
    );

    const button = filmCard.find(`button`);
    const link = filmCard.find(`a`);
    const linkClickPrevention = jest.fn();
    const card = filmCard.find(`article`);

    link.simulate(`click`, {
      preventDefault: linkClickPrevention
    });

    button.simulate(`click`, {
      preventDefault: linkClickPrevention
    });

    card.simulate(`mouseenter`);

    expect(linkClickPrevention).toHaveBeenCalledTimes(2);
    expect(clickHandler).toHaveBeenCalledWith(movie);
    expect(handlePreview).toHaveBeenCalledWith(movie);
  });
});
