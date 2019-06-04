import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

const withPrivateRoute = (Component) => {
  const WithPrivateRoute = (props) => {
    if (Object.keys(props.userData).length) {
      return <Component {...props} />;
    }

    return <Redirect to={`/login?redirect=${props.path}`} />;
  };

  WithPrivateRoute.propTypes = {
    userData: PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
      avatarUrl: PropTypes.string,
      name: PropTypes.string,
    }),
    path: PropTypes.string.isRequired,
  };

  return WithPrivateRoute;
};

export default withPrivateRoute;
