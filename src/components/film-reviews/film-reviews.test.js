import React from 'react';
import {create} from 'react-test-renderer';
import FilmReviews from './film-reviews.jsx';

const mock = {
  reviews: [
    {
      id: 11,
      comment: `Yohoho`,
      date: ``,
      user: {
        id: 2,
        name: `user`,
      }
    }
  ],
};

describe(`FilmReviews component`, () => {
  it(`renders correctly`, () => {
    const {reviews} = mock;

    const tree = create(
        <FilmReviews reviews={reviews} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
