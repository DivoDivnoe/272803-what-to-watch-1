import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const renderWTW = () => (
  <React.Fragment>
    <span className="logo__letter logo__letter--1">W</span>
    <span className="logo__letter logo__letter--2">T</span>
    <span className="logo__letter logo__letter--3">W</span>
  </React.Fragment>
);

const renderLink = (isMainPage, isLight) => {
  if (isMainPage) {
    return (
      <a className={`logo__link${isLight ? ` logo__link--light` : ``}`}>
        {renderWTW()}
      </a>
    );
  }

  return (
    <Link to="/" className={`logo__link${isLight ? ` logo__link--light` : ``}`}>
      {renderWTW()}
    </Link>
  );
};

const Logo = (props) => {
  const {isLight, isMainPage} = props;

  return (
    <div className="logo">
      {renderLink(isMainPage, isLight)}
    </div>
  );
};

Logo.propTypes = {
  isMainPage: PropTypes.bool.isRequired,
  isLight: PropTypes.bool.isRequired,
};

export default Logo;
