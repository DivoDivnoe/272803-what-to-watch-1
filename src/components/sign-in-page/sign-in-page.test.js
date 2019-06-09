import React from 'react';
import renderer from 'react-test-renderer';
import SignInPage from './sign-in-page.jsx';
import {BrowserRouter} from 'react-router-dom';

const mock = {
  authUserHandler: jest.fn(),
  history: {
    location: {
      search: ``
    },
    push: jest.fn(),
  },
  userData: {},
  email: ``,
  password: ``,
  changeEmail: jest.fn(),
  changePassword: jest.fn(),
  statusCode: 200,
  setStatusCode: jest.fn(),
};

describe(`SignInPage component`, () => {
  it(`renders correctly`, () => {
    const {
      authUserHandler,
      history,
      userData,
      email,
      password,
      changeEmail,
      changePassword,
      statusCode,
      setStatusCode,
    } = mock;

    const tree = renderer.create(
        <BrowserRouter>
          <SignInPage
            authUserHandler={authUserHandler}
            history={history}
            userData={userData}
            email={email}
            password={password}
            changeEmail={changeEmail}
            changePassword={changePassword}
            statusCode={statusCode}
            setStatusCode={setStatusCode}
          />
        </BrowserRouter>
    );

    expect(tree).toMatchSnapshot();
  });
});
