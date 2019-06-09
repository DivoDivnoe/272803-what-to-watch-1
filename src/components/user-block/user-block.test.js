import React from 'react';
import {create} from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import UserBlock from './user-block.jsx';

const mock = {
  userData: {
    avatarUrl: ``,
  }
};

describe(`UserBlock component`, () => {
  it(`renders correctly`, () => {
    const {userData} = mock;

    const tree = create(
        <BrowserRouter>
          <UserBlock userData={userData} />
        </BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
