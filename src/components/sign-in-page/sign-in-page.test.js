import React from 'react';
import renderer from 'react-test-renderer';
import SignInPage from './sign-in-page.jsx';
import {BrowserRouter} from 'react-router-dom';

const mock = {
  userData: {},
  email: ``,
  password: ``,
  statusCode: 200,
  isLoading: false,
  onSubmitForm: jest.fn(),
  onChangeEmail: jest.fn(),
  onChangePassword: jest.fn(),
};

describe(`SignInPage component`, () => {
  it(`renders correctly`, () => {
    const {
      userData,
      email,
      password,
      statusCode,
      isLoading,
      onChangeEmail,
      onChangePassword,
      onSubmitForm,
    } = mock;

    const tree = renderer.create(
        <BrowserRouter>
          <SignInPage
            userData={userData}
            email={email}
            password={password}
            statusCode={statusCode}
            isLoading={isLoading}
            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
            onSubmitForm={onSubmitForm}
          />
        </BrowserRouter>
    );

    expect(tree).toMatchSnapshot();
  });
});
