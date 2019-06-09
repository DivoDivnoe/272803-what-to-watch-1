import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignInPage from './sign-in-page.jsx';

configure({adapter: new Adapter()});

const mock = {
  authUserHandler: jest.fn(),
  history: {
    location: {
      search: ``
    },
    push: jest.fn(),
  },
  userData: {},
  email: `a`,
  password: `a`,
  changeEmail: jest.fn(),
  changePassword: jest.fn(),
  statusCode: 200,
  setStatusCode: jest.fn(),
};

describe(`SignInPage component`, () => {
  it(`handles correctly submit form event`, () => {
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

    const submitFormPrevention = jest.fn();

    const signIn = shallow(
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
    );

    signIn.find(`form`).simulate(`submit`, {
      preventDefault: submitFormPrevention,
    });

    expect(submitFormPrevention).toHaveBeenCalledTimes(1);
  });
});
