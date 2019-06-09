import React from 'react';
import PropTypes from 'prop-types';
import PropType from '../../proptypes.js';

const FilmsList = (props) => {
  const {movies, renderFilmCard} = props;

  return (
    <div className="catalog__movies-list">
      {movies.map((movie) => renderFilmCard(movie))}
    </div>
  );
};

FilmsList.propTypes = {
  movies: PropTypes.arrayOf(PropType.movie).isRequired,
  renderFilmCard: PropTypes.func.isRequired,
};

export default FilmsList;
