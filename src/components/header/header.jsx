import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../logo/logo.jsx';
import UserBlock from '../user-block/user-block.jsx';


const Header = (props) => {
  const {userData, isMainPage, additionalClassName} = props;

  return (
    <header className={`page-header ${additionalClassName}`}>
      <Logo isMainPage={isMainPage} isLight={false} />
      <UserBlock userData={userData} />
    </header>
  );
};

Header.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
  }),
  isMainPage: PropTypes.bool.isRequired,
  additionalClassName: PropTypes.string.isRequired,
};

export default Header;
