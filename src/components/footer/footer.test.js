import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './footer.jsx';

const mock = {
  isMainPage: true,
};

describe(`Footer component`, () => {
  it(`renders correctly`, () => {
    const {isMainPage} = mock;

    const tree = renderer.create(
        <Footer
          isMainPage={isMainPage}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
