import React from 'react';
import PropTypes from 'prop-types';
import PropType from '../../proptypes.js';
import Review from '../review/review.jsx';

const FilmReviews = (props) => {
  const {comments: reviews} = props;

  reviews.sort((prev, next) => Date.parse(next.date) - Date.parse(prev.date));

  const even = reviews.filter((_, index) => !(index % 2));
  const odd = reviews.filter((_, index) => index % 2);

  return (
    <div className="movie-card__reviews movie-card__row">
      {[even, odd].map((item, i) => (
        <div className="movie-card__reviews-col" key={`movie-review-${i}`}>
          {item.map((review, index) => <Review review={review} key={`review-${index}`}/>)}
        </div>
      ))}
    </div>
  );
};

FilmReviews.propTypes = {
  comments: PropTypes.arrayOf(PropType.review).isRequired,
};

export default FilmReviews;
