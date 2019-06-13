import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import MovieHeroButton from '../movie-hero-button/move-hero-button.jsx';
import PropType from '../../proptypes.js';

const MovieHeroDesc = (props) => {
  const {
    movie,
    reviewsLinkRequired,
    isInList,
    onSwitchPlayer,
    onSetToFavorites,
  } = props;

  const buttonObjs = [
    {type: `play`, handler: onSwitchPlayer},
    {type: `list`, handler: onSetToFavorites}
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
            onClick={item.handler}
            isInList={isInList}
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
  reviewsLinkRequired: PropTypes.bool.isRequired,
  isInList: PropTypes.bool.isRequired,
  onSwitchPlayer: PropTypes.func.isRequired,
  onSetToFavorites: PropTypes.func.isRequired,
};

export default MovieHeroDesc;
