import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignInPage from './sign-in-page.jsx';

configure({adapter: new Adapter()});

describe(`SignInPage component`, () => {
  it(`handles correctly submit form event`, () => {

    const authUserHandler = jest.fn();
    const submitFormPrevention = jest.fn();
    const history = {
      push: jest.fn()
    };

    const signIn = shallow(
        <SignInPage authUserHandler={authUserHandler} history={history} />
    );

    signIn.find(`form`).simulate(`submit`, {
      preventDefault: submitFormPrevention,
      target: {
        [`user-email`]: {value: `andrey@ivanov.net`},
        [`user-password`]: {value: `1234`}
      }
    });

    expect(submitFormPrevention).toHaveBeenCalledTimes(1);
  });
});
