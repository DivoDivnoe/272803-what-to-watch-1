import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../logo/logo.jsx';

const Footer = (props) => {
  const {isMainPage} = props;

  return (
    <footer className="page-footer">
      <Logo isMainPage={isMainPage} isLight={true} />

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  isMainPage: PropTypes.bool.isRequired,
};

export default Footer;
