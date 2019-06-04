import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

const withPrivateRoute = (Component) => {
  const WithPrivateRoute = (props) => {
    if (props.isAuthenticated) {
      return <Component {...props} />;
    }

    return <Redirect to={`/login?redirect=${props.path}`} />;
  };

  WithPrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
  };

  return WithPrivateRoute;
};

export default withPrivateRoute;
