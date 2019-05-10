import React from 'react';
import PropTypes from 'prop-types';

const FilmCard = ({movie, clickHandler, handlePreview, stopPreview}) => {
  const chooseFilm = (evt) => {
    evt.preventDefault();

    clickHandler(movie);
  };

  const mouseEnterHandler = () => {
    handlePreview(movie);
  };

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={stopPreview}
    >
      <button className="small-movie-card__play-btn" type="button" onClick={chooseFilm}>
        Play
      </button>
      <div className="small-movie-card__image">
        <img
          src={movie.image}
          alt={movie.title}
          width="280"
          height="175"
        />
      </div>
      <h3 className="small-movie-card__title" >
        <a className="small-movie-card__link" href="movie-page.html" onClick={chooseFilm}>
          {movie.title}
        </a>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.oneOf([
      `crime`, `thriller`, `comedy`, `family`, `documentary`, `horror`, `drama`
    ]).isRequired,
  }),
  clickHandler: PropTypes.func.isRequired,
  handlePreview: PropTypes.func.isRequired,
  stopPreview: PropTypes.func.isRequired,
};

export default FilmCard;
