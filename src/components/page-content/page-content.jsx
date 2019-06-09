import React from 'react';
import PropTypes from 'prop-types';

const PageContent = (props) => (
  <div className="page-content">
    {props.children}
  </div>
);

PageContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default PageContent;
