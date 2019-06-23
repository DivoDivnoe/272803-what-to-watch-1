import React from 'react';
import {create} from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import UserBlock from './user-block.jsx';

const mock = {
  userData: {
    avatarUrl: ``,
  },
  isLinkRequired: true,
};

describe(`UserBlock component`, () => {
  it(`renders correctly`, () => {
    const {userData, isLinkRequired} = mock;

    const tree = create(
        <BrowserRouter>
          <UserBlock userData={userData} isLinkRequired={isLinkRequired} />
        </BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
