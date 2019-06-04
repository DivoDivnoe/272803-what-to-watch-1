import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const UserBlock = (props) => {
  const {userData} = props;

  const render = () => {
    if (!userData) {
      return (
        <Link to="/login" className="user-block__link">Sign in</Link>
      );
    }

    return (
      <div className="user-block__avatar">
        <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
      </div>
    );
  };

  return (
    <div className="user-block">
      {render()}
    </div>
  );
};

UserBlock.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default UserBlock;
