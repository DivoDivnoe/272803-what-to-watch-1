import React from 'react';
import {configure, mount} from 'enzyme';
import {BrowserRouter} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import AddReviewPage from './add-review-page.jsx';

configure({adapter: new Adapter()});

describe(`AddReviewPage component`, () => {
  it(`doesnt send data, if is not rating set`, () => {
    const mock = {
      film: {
        id: 1,
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
      userData: {},
      rating: 0,
      comment: `this is a very interesting film. My mother enjoyed it very much`,
      isLoading: false,
      onSetRating: jest.fn(),
      onSetMessage: jest.fn(),
      onSubmit: jest.fn(),
    };

    const {film, userData, rating, comment, isLoading, onSetMessage, onSetRating, onSubmit} = mock;

    const comp = mount(
        <BrowserRouter>
          <AddReviewPage
            film={film}
            userData={userData}
            rating={rating}
            comment={comment}
            isLoading={isLoading}
            onSetMessage={onSetMessage}
            onSetRating={onSetRating}
            onSubmit={onSubmit}
          />
        </BrowserRouter>
    );

    expect(comp.find(`button`).props().disabled).toEqual(true);
  });

  it(`doesnt send data, if message is too short`, () => {
    const mock = {
      film: {
        id: 1,
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
      userData: {},
      rating: 3,
      comment: `interesting`,
      isLoading: false,
      onSetRating: jest.fn(),
      onSetMessage: jest.fn(),
      onSubmit: jest.fn(),
    };

    const {film, userData, rating, comment, isLoading, onSetMessage, onSetRating, onSubmit} = mock;

    const comp = mount(
        <BrowserRouter>
          <AddReviewPage
            film={film}
            userData={userData}
            rating={rating}
            comment={comment}
            isLoading={isLoading}
            onSetMessage={onSetMessage}
            onSetRating={onSetRating}
            onSubmit={onSubmit}
          />
        </BrowserRouter>
    );

    expect(comp.find(`button`).props().disabled).toEqual(true);
  });

  it(`submits form correctly`, () => {
    const mock = {
      film: {
        id: 1,
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
      userData: {},
      rating: 5,
      comment: `this is a very interesting film. My mother enjoyed it very much`,
      isLoading: false,
      onSetRating: jest.fn(),
      onSetMessage: jest.fn(),
      onSubmit: jest.fn(),
    };

    const {film, userData, rating, comment, isLoading, onSetMessage, onSetRating, onSubmit} = mock;

    const comp = mount(
        <BrowserRouter>
          <AddReviewPage
            film={film}
            userData={userData}
            rating={rating}
            comment={comment}
            isLoading={isLoading}
            onSetMessage={onSetMessage}
            onSetRating={onSetRating}
            onSubmit={onSubmit}
          />
        </BrowserRouter>
    );

    const submitPrevention = jest.fn();

    expect(comp.find(`button`).props().disabled).toEqual(false);

    comp.find(`form`).simulate(`submit`, {
      preventDefault: submitPrevention,
    });
    expect(submitPrevention).toHaveBeenCalledTimes(1);
  });
});
