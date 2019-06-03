import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const UserBlock = (props) => {
  const {userData} = props;

  if (!userData) {
    return (
      <div className="user-block">
        <Link to="/login" className="user-block__link">Sign in</Link>
      </div>
    );
  }

  return (
    <div className="user-block__avatar">
      <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
    </div>
  );
};

UserBlock.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default UserBlock;
