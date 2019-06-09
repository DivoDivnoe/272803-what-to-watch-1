import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

const withPrivateRoute = (Component) => {
  const WithPrivateRoute = (props) => {
    const {path, isAuthenticated, render} = props;

    const renderPrivate = () => {
      if (isAuthenticated) {
        return render;
      }

      const redirect = (properties) => (
        <Redirect to={`/login?redirect=${properties.match.url}`} />
      );

      return redirect;
    };

    return <Component path={path} render={renderPrivate()} />;
  };

  WithPrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
  };

  return WithPrivateRoute;
};

export default withPrivateRoute;
