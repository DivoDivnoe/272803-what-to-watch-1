import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header.jsx';
import Logo from '../logo/logo.jsx';
import UserBlock from '../user-block/user-block.jsx';
import PropType from '../../proptypes.js';

const MovieHeroHead = (props) => {
  const {movie, userData, isMainPage, renderBreadCrumbs} = props;

  return (
    <React.Fragment>
      <div className="movie-card__bg" style={{backgroundColor: movie.backgroundColor}}>
        {<img src={movie.backgroundImage} alt={movie.name}/>}
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header extraClassName="movie-card__head">
        <Logo isMainPage={isMainPage} isLight={false} />
        {renderBreadCrumbs && renderBreadCrumbs()}
        <UserBlock userData={userData} />
      </Header>
    </React.Fragment>
  );
};

MovieHeroHead.propTypes = {
  userData: PropType.userData.isRequired,
  isMainPage: PropTypes.bool.isRequired,
  movie: PropType.movie.isRequired,
  renderBreadCrumbs: PropTypes.func,
};

export default MovieHeroHead;
