import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import Logo from './logo.jsx';

const mock = {
  isMainPage: true,
  isLight: true,
};

describe(`Logo component`, () => {
  it(`renders correctly`, () => {
    const {isMainPage, isLight} = mock;

    const tree = renderer.create(
        <BrowserRouter>
          <Logo
            isMainPage={isMainPage}
            isLight={isLight}
          />
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
