import React from 'react';
import renderer from 'react-test-renderer';
import MovieHeroButton from './move-hero-button.jsx';

const mock = {
  type: `play`,
  onClick: jest.fn(),
  isInList: false,
};

describe(`MovieHeroButton component`, () => {
  const {
    type,
    onClick,
    isInList,
  } = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <MovieHeroButton
          type={type}
          onClick={onClick}
          isInList={isInList}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
