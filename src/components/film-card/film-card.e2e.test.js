import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FilmCard from './film-card.jsx';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const renderPlayer = () => <MockComponent />;

const mock = {
  movieTitle: `Иван Васильевич меняет профессию`,
  handlePreview: jest.fn(),
  stopPreview: jest.fn(),
  isLoading: false,
};

describe(`FilmCard component`, () => {
  it(`handles correctly mouseenter event`, (done) => {
    const {movieTitle, handlePreview, stopPreview, isLoading} = mock;

    const filmCard = mount(
        <FilmCard
          movieTitle={movieTitle}
          renderPlayer={renderPlayer}
          handlePreview={handlePreview}
          stopPreview={stopPreview}
          isLoading={isLoading}
        />
    );

    filmCard.find(`article`).simulate(`mouseenter`);

    setTimeout(() => {
      expect(handlePreview).toHaveBeenCalledWith(movieTitle);
      done();
    }, 1000);
  });
});
