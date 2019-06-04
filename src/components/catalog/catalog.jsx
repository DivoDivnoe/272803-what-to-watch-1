import React from 'react';
import PropTypes from 'prop-types';
import FilmsList from '../films-list/films-list.jsx';
import {appGenres} from '../../mocks/films';
import withCurrentFilm from '../../hocs/with-current-film/with-current-film';

const FilmsListWithState = withCurrentFilm(FilmsList);

const Catalog = (props) => {
  const {movies, renderTabs, renderButton} = props;

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      {renderTabs()}

      <FilmsListWithState movies={movies} />

      {renderButton()}
    </section>
  );
};

Catalog.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    genre: PropTypes.oneOf(appGenres).isRequired,
  })).isRequired,
  renderTabs: PropTypes.func.isRequired,
  renderButton: PropTypes.func.isRequired,
};

export default Catalog;
