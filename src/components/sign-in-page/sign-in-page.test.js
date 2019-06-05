import React from 'react';
import renderer from 'react-test-renderer';
import SignInPage from './sign-in-page.jsx';
import {BrowserRouter} from 'react-router-dom';

describe(`SignInPage component`, () => {
  it(`renders correctly`, () => {
    const authUserHandler = jest.fn();
    const history = {
      location: {
        search: ``
      },
      push: jest.fn()
    };

    const tree = renderer.create(
        <BrowserRouter>
          <SignInPage authUserHandler={authUserHandler} history={history} />
        </BrowserRouter>
    );

    expect(tree).toMatchSnapshot();
  });
});
