import React from 'react';
import {create} from 'react-test-renderer';
import FilmReviews from './film-reviews.jsx';

const mock = {
  comments: [
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
    const {comments} = mock;

    const tree = create(
        <FilmReviews comments={comments} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
