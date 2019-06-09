import React from 'react';
import renderer from 'react-test-renderer';
import MovieHeroButton from './move-hero-button.jsx';

const mock = {
  type: `play`,
  clickHandler: jest.fn(),
  isInList: false,
  disabled: false,
};

describe(`MovieHeroButton component`, () => {
  const {
    type,
    clickHandler,
    isInList,
    disabled,
  } = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <MovieHeroButton
          type={type}
          clickHandler={clickHandler}
          isInList={isInList}
          disabled={disabled}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
