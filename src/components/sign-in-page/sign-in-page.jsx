import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import Logo from '../logo/logo.jsx';

const SignInPage = (props) => {
  const {history, authUserHandler} = props;

  const path = history.location.search.split(`=`)[1];
  const redirect = () => history.push(path);

  const submitFormHandler = (evt) => {
    evt.preventDefault();
    const {target} = evt;

    const email = target[`user-email`].value;
    const password = target[`user-password`].value;

    if (email.length && password.length) {
      authUserHandler({email, password}, redirect);
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
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
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
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
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
  userData: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default SignInPage;
