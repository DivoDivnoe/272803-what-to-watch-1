import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import AddReviewPage from './add-review-page.jsx';

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
  comment: ``,
  isLoading: false,
  onSetRating: jest.fn(),
  onSetMessage: jest.fn(),
  onSubmit: jest.fn(),
};

describe(`AddReviewPage component`, () => {
  it(`renders correctly`, () => {
    const {
      film,
      userData,
      rating,
      comment,
      isLoading,
      onSetRating,
      onSetMessage,
      onSubmit,
    } = mock;

    const tree = renderer.create(
        <BrowserRouter>
          <AddReviewPage
            film={film}
            userData={userData}
            rating={rating}
            comment={comment}
            isLoading={isLoading}
            onSetRating={onSetRating}
            onSetMessage={onSetMessage}
            onSubmit={onSubmit}
          />
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
