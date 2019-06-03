import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import Header from './header.jsx';

const mock = {
  userData: {
    id: 10,
    email: ``,
    avatarUrl: ``,
    name: ``,
  },
  isMainPage: false,
};

describe(`Header component`, () => {
  it(`renders correctly`, () => {
    const {userData, isMainPage} = mock;

    const tree = renderer.create(
        <BrowserRouter>
          <Header isMainPage={isMainPage} userData={userData} />
        </BrowserRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
