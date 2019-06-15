import React from 'react';
import renderer from 'react-test-renderer';
import PageNotExistMessage from './page-not-exist-message.jsx';

describe(`PageNotExistMessage component`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <PageNotExistMessage />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
