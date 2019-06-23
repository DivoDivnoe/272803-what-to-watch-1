import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import PropType from '../../proptypes';
import {HOST_NAME} from '../../constants';

const render = (userData, isLinkRequired) => {
  if (!Object.keys(userData).length) {
    return (
      <Link to="/login" className="user-block__link">Sign in</Link>
    );
  } else {
    const renderAvatar = () => (
      <div className="user-block__avatar">
        <img src={`${HOST_NAME}${userData.avatarUrl}`} alt="User avatar" width="63" height="63" />
      </div>
    );

    if (isLinkRequired) {
      return (
        <Link to="/mylist">
          {renderAvatar()}
        </Link>
      );
    }

    return (
      <a>
        {renderAvatar()}
      </a>
    );
  }
};

const UserBlock = (props) => {
  const {userData, isLinkRequired} = props;

  return (
    <div className="user-block">
      {render(userData, isLinkRequired)}
    </div>
  );
};

UserBlock.propTypes = {
  userData: PropType.userData,
  isLinkRequired: PropTypes.bool.isRequired,
};

export default UserBlock;
