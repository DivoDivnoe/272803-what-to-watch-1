import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FilmCard from './film-card.jsx';
import {BrowserRouter} from 'react-router-dom';

configure({adapter: new Adapter()});

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
  it(`handles correctly mouseenter event`, (done) => {
    const {movie, handlePreview, stopPreview, isLoading} = mock;

    const filmCard = mount(
        <BrowserRouter>
          <FilmCard
            movie={movie}
            renderPlayer={renderPlayer}
            handlePreview={handlePreview}
            stopPreview={stopPreview}
            isLoading={isLoading}
          />
        </BrowserRouter>
    );

    filmCard.find(`article`).simulate(`mouseenter`);

    setTimeout(() => {
      expect(handlePreview).toHaveBeenCalledWith(movie.name);
      done();
    }, 1000);
  });
});
