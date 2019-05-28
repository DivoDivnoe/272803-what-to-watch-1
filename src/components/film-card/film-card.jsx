import React from 'react';
import PropTypes from 'prop-types';

const TIMEOUT = 1000;

const FilmCard = (props) => {
  const {movieTitle, renderPlayer, isLoading, stopPreview, handlePreview} = props;

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
        <a className="small-movie-card__link" href="movie-page.html">
          {movieTitle}
        </a>
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
};

export default FilmCard;
