import React from 'react';
import PropType from '../../proptypes.js';

const Rating = {
  BAD: `Bad`,
  NORMAL: `Normal`,
  GOOD: `Good`,
  VERY_GOOD: `Very good`,
  GREAT: `Awesome`,
};

const RatingValue = {
  GREAT_VALUE: 10,
  VERY_GOOD_MIN_VALUE: 8,
  GOOD_MIN_VALUE: 5,
  NORMAL_MIN_VALUE: 3,
  BAD_MIN_VALUE: 0,
};

const getRatingString = (rating) => {
  let result;

  if (rating >= RatingValue.BAD_MIN_VALUE && rating < RatingValue.NORMAL_MIN_VALUE) {
    result = Rating.BAD;
  } else if (rating < RatingValue.GOOD_MIN_VALUE) {
    result = Rating.NORMAL;
  } else if (rating < RatingValue.VERY_GOOD_MIN_VALUE) {
    result = Rating.GOOD;
  } else if (rating < RatingValue.GREAT_VALUE) {
    result = Rating.VERY_GOOD;
  } else if (rating === RatingValue.GREAT_VALUE) {
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
