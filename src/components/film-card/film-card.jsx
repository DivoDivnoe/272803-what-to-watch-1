import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const TIMEOUT = 1000;

const FilmCard = (props) => {
  const {
    movieTitle,
    renderPlayer,
    isLoading,
    stopPreview,
    handlePreview,
    movieId,
  } = props;

  const mouseEnterHandler = (evt) => {
    const {currentTarget} = evt;

    const timeoutId = setTimeout(() => {
      handlePreview(movieTitle);
    }, TIMEOUT);

    currentTarget.onmouseleave = () => {
      stopPreview();
      clearTimeout(timeoutId);
      currentTarget.onmouseleave = null;
    };
  };

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={isLoading ? null : mouseEnterHandler}
    >
      {renderPlayer()}
      <h3 className="small-movie-card__title" >
        <Link className="small-movie-card__link" to={`/film/${movieId}`}>
          {movieTitle}
        </Link>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  movieTitle: PropTypes.string.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  stopPreview: PropTypes.func.isRequired,
  handlePreview: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  movieId: PropTypes.number.isRequired,
};

export default FilmCard;
