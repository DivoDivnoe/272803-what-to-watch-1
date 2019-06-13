import React from 'react';
import {Link} from 'react-router-dom';
import MovieHeroHead from '../movie-hero-head/movie-hero-head.jsx';
import PropType from '../../proptypes.js';
import PropTypes from 'prop-types';

const MAX_STARS = 5;

const MIN_MESSAGE_LENGTH = 50;
const MAX_MESSAGE_LENGTH = 400;

const AddReviewPage = (props) => {
  const {
    film,
    userData,
    rating,
    comment,
    setRating,
    setMessage,
    submitHandler,
    isLoading,
  } = props;

  const disabled = !rating || comment.length < MIN_MESSAGE_LENGTH || comment.length > MAX_MESSAGE_LENGTH || isLoading;

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <MovieHeroHead
          movie={film}
          userData={userData}
          isMainPage={false}
          renderBreadCrumbs={() => (
            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`/film/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>
          )}
        />

        <div className="movie-card__poster movie-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form" onSubmit={(evt) => {
          evt.preventDefault();
          submitHandler();
        }}>
          <div className="rating">
            <div className="rating__stars">
              {Array.from({length: MAX_STARS}, (_, i) => i + 1).map((value) => (
                <React.Fragment key={`input-${value}`}>
                  <input
                    className="rating__input"
                    id={`star-${value}`}
                    type="radio"
                    name="rating"
                    value={value}
                    onChange={() => setRating(value)}
                  />
                  <label className="rating__label" htmlFor={`star-${value}`}>{`Rating ${value}`}</label>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              onChange={(evt) => setMessage(evt.target.value)}
            />
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
                disabled={disabled}
              >
              Post
              </button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
};

AddReviewPage.propTypes = {
  userData: PropType.userData,
  film: PropType.movie,
  rating: PropTypes.oneOf([0, 1, 2, 3, 4, 5]).isRequired,
  comment: PropTypes.string.isRequired,
  setRating: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default AddReviewPage;
