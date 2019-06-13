import React from 'react';
import PropType from '../../proptypes.js';

const getDateObj = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString(`en-us`, {month: `long`});
  const year = date.getFullYear();

  return {day, month, year};
};

const Review = (props) => {
  const {review} = props;
  const {day, month, year} = getDateObj(review.date);

  return (
    <div className="review">
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

Review.propTypes = {
  review: PropType.review,
};

export default Review;
