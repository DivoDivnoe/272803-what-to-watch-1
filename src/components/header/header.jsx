import React from 'react';
import PropTypes from 'prop-types';
import PropType from '../../proptypes.js';

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
  children: PropType.children,
};

export default Header;
