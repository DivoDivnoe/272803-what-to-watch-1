import React from 'react';
import {Link} from 'react-router-dom';
import PropType from '../../proptypes';
import {HOST_NAME} from '../../constants';

const UserBlock = (props) => {
  const {userData} = props;

  const render = () => {
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

  return (
    <div className="user-block">
      {render()}
    </div>
  );
};

UserBlock.propTypes = {
  userData: PropType.userData,
};

export default UserBlock;
