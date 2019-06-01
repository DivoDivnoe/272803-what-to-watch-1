import React from 'react';
import PropTypes from 'prop-types';
import {appGenres} from '../../mocks/films';

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
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    genre: PropTypes.oneOf(appGenres).isRequired,
  })).isRequired,
  renderFilmCard: PropTypes.func.isRequired,
};

export default FilmsList;
