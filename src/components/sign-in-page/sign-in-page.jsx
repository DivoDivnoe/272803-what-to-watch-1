import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import Logo from '../logo/logo.jsx';
import {StatusCode} from '../../constants.js';
import PropType from '../../proptypes.js';

const Message = {
  [StatusCode.FORBIDDEN]: <p>We can’t recognize this email <br /> and password combination. Please try again.</p>,
  [StatusCode.BAD_REQUEST]: <p>Please enter a valid email address</p>,
};

const SignInPage = (props) => {
  const {
    history,
    authUserHandler,
    email,
    password,
    changeEmail,
    changePassword,
    statusCode,
    setStatusCode,
    isLoading,
  } = props;

  const path = history.location.search.split(`=`)[1];

  const redirect = () => history.push(path);
  const renderSignInMessage = (message) => {
    return (
      <div className="sign-in__message">
        {message}
      </div>
    );
  };

  const submitFormHandler = (evt) => {
    evt.preventDefault();

    if (email.length && password.length) {
      authUserHandler({email, password}, redirect, setStatusCode);
    }
  };

  return (
    <div className="user-page">
      <Header extraClassName={`user-page__head`}>
        <Logo isMainPage={false} isLight={false} />

        <h1 className="page-title user-page__title">Sign in</h1>
      </Header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={submitFormHandler}>
          {statusCode && renderSignInMessage(Message[statusCode])}
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                onChange={(evt) => changeEmail(evt.target.value)}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                onChange={(evt) => changePassword(evt.target.value)}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button
              className="sign-in__btn"
              type="submit"
              disabled={!email.length || !password.length}
            >Sign in</button>
          </div>
        </form>
      </div>

      <Footer isMainPage={false} />
    </div>
  );
};

SignInPage.propTypes = {
  authUserHandler: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  userData: PropType.userData,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeEmail: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  statusCode: PropTypes.number,
  setStatusCode: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SignInPage;
