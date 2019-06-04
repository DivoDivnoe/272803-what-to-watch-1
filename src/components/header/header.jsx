import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
  const {extraClassName} = props;

  return (
    <header className={`page-header ${extraClassName}`}>
      {props.children}
    </header>
  );
};

Header.propTypes = {
  extraClassName: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Header;
