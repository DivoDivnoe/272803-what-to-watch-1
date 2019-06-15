import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignInPage from './sign-in-page.jsx';

configure({adapter: new Adapter()});

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
  it(`handles correctly submit form event`, () => {
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

    const submitFormPrevention = jest.fn();

    const signIn = shallow(
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
    );

    signIn.find(`form`).simulate(`submit`, {
      preventDefault: submitFormPrevention,
    });

    expect(submitFormPrevention).toHaveBeenCalledTimes(1);
  });
});
