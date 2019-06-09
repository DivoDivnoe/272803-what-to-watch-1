import React from 'react';
import PropTypes from 'prop-types';
import FilmsList from '../films-list/films-list.jsx';
import withCurrentFilm from '../../hocs/with-current-film/with-current-film';
import PropType from '../../proptypes.js';

const FilmsListWithState = withCurrentFilm(FilmsList);

const Catalog = (props) => {
  const {
    movies,
    renderTabs,
    renderButton,
    extraClassName,
    renderTitle
  } = props;

  const extraClass = extraClassName || ``;

  return (
    <section className={`catalog ${extraClass}`}>
      {renderTitle()}

      {renderTabs()}

      <FilmsListWithState movies={movies} />

      {renderButton()}
    </section>
  );
};

Catalog.propTypes = {
  movies: PropTypes.arrayOf(PropType.movie).isRequired,
  renderTitle: PropTypes.func.isRequired,
  renderTabs: PropTypes.func.isRequired,
  renderButton: PropTypes.func.isRequired,
  extraClassName: PropTypes.string,
};

export default Catalog;
