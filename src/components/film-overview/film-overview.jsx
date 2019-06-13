import React from 'react';
import PropType from '../../proptypes.js';

const Rating = {
  BAD: `Bad`,
  NORMAL: `Normal`,
  GOOD: `Good`,
  VERY_GOOD: `Very good`,
  GREAT: `Awesome`,
};

const getRatingString = (rating) => {
  let result;

  if (rating >= 0 && rating < 3) {
    result = Rating.BAD;
  } else if (rating < 5) {
    result = Rating.NORMAL;
  } else if (rating < 8) {
    result = Rating.GOOD;
  } else if (rating < 10) {
    result = Rating.VERY_GOOD;
  } else if (rating === 10) {
    result = Rating.GREAT;
  }

  return result;
};

const FilmOverview = (props) => {
  const {film} = props;

  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{film.rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getRatingString(film.rating)}</span>
          <span className="movie-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{film.description}</p>
        <p className="movie-card__director"><strong>Director: {film.director}</strong></p>
        <p className="movie-card__starring"><strong>Starring: {film.starring && film.starring.join(`, `)} and other</strong></p>
      </div>
    </React.Fragment>
  );
};

FilmOverview.propTypes = {
  film: PropType.movie.isRequired,
};

export default FilmOverview;
