import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import MovieHeroButton from '../movie-hero-button/move-hero-button.jsx';
import PropType from '../../proptypes.js';

const MovieHeroDesc = (props) => {
  const {
    movie,
    switchPlayer,
    reviewsLinkRequired,
    isInList,
    setToFavoritesHandler,
  } = props;

  const buttonObjs = [
    {type: `play`, handler: switchPlayer, disabled: false},
    {type: `list`, handler: setToFavoritesHandler, disabled: isInList}
  ];

  return (
    <div className="movie-card__desc">
      <h2 className="movie-card__title">{movie.name}</h2>
      <p className="movie-card__meta">
        <span className="movie-card__genre">{movie.genre}</span>
        <span className="movie-card__year">{movie.released}</span>
      </p>

      <div className="movie-card__buttons">
        {buttonObjs.map((item, index) => (
          <MovieHeroButton
            type={item.type}
            key={`${item.type}-${index}`}
            clickHandler={item.handler}
            isInList={isInList}
            disabled={item.disabled}
          />
        ))}
        {reviewsLinkRequired && <Link to={`/film/${movie.id}/review`} className="btn movie-card__button">
        Add review
        </Link>}
      </div>
    </div>
  );
};

MovieHeroDesc.propTypes = {
  movie: PropType.movie,
  switchPlayer: PropTypes.func.isRequired,
  reviewsLinkRequired: PropTypes.bool.isRequired,
  isInList: PropTypes.bool.isRequired,
  setToFavoritesHandler: PropTypes.func.isRequired,
};

export default MovieHeroDesc;
