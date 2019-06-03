import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from './sign-in';

describe(`SignIn component`, () => {
  it(`renders correctly`, () => {
    const authUserHandler = jest.fn();

    const tree = renderer.create(
        <SignIn authUserHandler={authUserHandler} />
    );

    expect(tree).toMatchSnapshot();
  });
});
