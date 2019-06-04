import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

const withPublicRedirect = (Component) => {
  const WithPublicRedirect = (props) => {
    const {isAuthenticated, location} = props;
    const path = location.search.split(`=`)[1] || `/`;

    if (isAuthenticated) {
      return <Redirect to={path} />;
    }

    return <Component {...props} />;
  };

  WithPublicRedirect.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    location: PropTypes.object,
  };

  return WithPublicRedirect;
};

export default withPublicRedirect;
