import React from 'react';
import PropTypes from 'prop-types';

const getDateObj = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString(`en-us`, {month: `long`});
  const year = date.getFullYear();

  return {day, month, year};
};

const FilmReviews = (props) => {
  const {reviews} = props;

  reviews.sort((prev, next) => Date.parse(next.date) - Date.parse(prev.date));

  const even = reviews.filter((_, index) => !(index % 2));
  const odd = reviews.filter((_, index) => index % 2);

  const renderReview = (review, index) => {
    const {day, month, year} = getDateObj(review.date);

    return (
      <div className="review" key={`review-${index}`}>
        <blockquote className="review__quote">
          <p className="review__text">{review.comment}</p>

          <footer className="review__details">
            <cite className="review__author">{review.user && review.user.name}</cite>
            <time className="review__date" dateTime={review.date}>{`${month} ${day}, ${year}`}</time>
          </footer>
        </blockquote>

        <div className="review__rating">{review.rating}</div>
      </div>
    );
  };

  return (
    <div className="movie-card__reviews movie-card__row">
      {[even, odd].map((item, i) => (
        <div className="movie-card__reviews-col" key={`movie-review-${i}`}>
          {item.map((review, index) => renderReview(review, index))}
        </div>
      ))}
    </div>
  );
};

FilmReviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  })).isRequired,
};

export default FilmReviews;
