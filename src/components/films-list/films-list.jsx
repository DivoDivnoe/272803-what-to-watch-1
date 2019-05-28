import React from 'react';
import PropTypes from 'prop-types';

const FilmsList = (props) => {
  const {movies, renderFilmCard} = props;

  return (
    <div className="catalog__movies-list">
      {movies.map((movie) => renderFilmCard(movie))}
    </div>
  );
};

FilmsList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    genre: PropTypes.oneOf([
      `crime`, `thriller`, `comedy`, `family`, `documentary`, `horror`, `drama`
    ]).isRequired,
  })).isRequired,
  renderFilmCard: PropTypes.func.isRequired,
};

export default FilmsList;
