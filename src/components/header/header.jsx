import React from 'react';
import PropTypes from 'prop-types';
import PropType from '../../proptypes.js';

const Header = (props) => {
  const extraClassName = props.extraClassName || ``;

  return (
    <header className={`page-header ${extraClassName}`}>
      {props.children}
    </header>
  );
};

Header.propTypes = {
  extraClassName: PropTypes.string,
  children: PropType.children,
};

export default Header;
