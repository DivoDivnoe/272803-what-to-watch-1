import React from 'react';
import renderer from 'react-test-renderer';
import PageContent from './page-content.jsx';

const MockComponent = () => <div />;

describe(`PageContent component`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(
        <PageContent>
          <MockComponent />
        </PageContent>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
