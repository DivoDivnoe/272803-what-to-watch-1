import React from 'react';
import {Link} from 'react-router-dom';
import PropType from '../../proptypes';
import {HOST_NAME} from '../../constants';

const render = (userData) => {
  if (!Object.keys(userData).length) {
    return (
      <Link to="/login" className="user-block__link">Sign in</Link>
    );
  }

  return (
    <div className="user-block__avatar">
      <img src={`${HOST_NAME}${userData.avatarUrl}`} alt="User avatar" width="63" height="63" />
    </div>
  );
};

const UserBlock = (props) => {
  const {userData} = props;

  return (
    <div className="user-block">
      {render(userData)}
    </div>
  );
};

UserBlock.propTypes = {
  userData: PropType.userData,
};

export default UserBlock;
