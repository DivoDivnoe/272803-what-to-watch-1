import React from 'react';
import renderer from 'react-test-renderer';
import Review from './review.jsx';

const mock = {
  review: {
    id: 11,
    comment: `Yohoho`,
    date: ``,
    user: {
      id: 2,
      name: `user`,
    }
  },
};

describe(`Review component`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <Review
          review={mock.review}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
