import React from 'react';
import renderer from 'react-test-renderer';
import Header from './header.jsx';

const mock = {
  extraClassName: `some-class`,
};
const MockComponent = () => <div />;

describe(`Header component`, () => {
  it(`renders correctly`, () => {
    const {extraClassName} = mock;

    const tree = renderer.create(
        <Header extraClassName={extraClassName}>
          <MockComponent />
        </Header>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
