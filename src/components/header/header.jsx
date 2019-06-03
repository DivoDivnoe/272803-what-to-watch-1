import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../logo/logo.jsx';
import UserBlock from '../user-block/user-block.jsx';


const Header = (props) => {
  const {userData, isMainPage} = props;

  return (
    <header className="page-header movie-card__head">
      <Logo isMainPage={isMainPage} isLight={false} />
      <UserBlock userData={userData} />
    </header>
  );
};

Header.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  isMainPage: PropTypes.bool.isRequired,
};

export default Header;
