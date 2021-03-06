import React from 'react';
import PropTypes from 'prop-types';
import FilmsList from '../films-list/films-list.jsx';
import withCurrentFilm from '../../hocs/with-current-film/with-current-film';
import PropType from '../../proptypes.js';

const FilmsListWithState = withCurrentFilm(FilmsList);

const Catalog = (props) => {
  const {
    movies,
    extraClassName,
    renderTabs,
    renderButton,
    renderTitle
  } = props;

  const extraClass = extraClassName || ``;

  return (
    <section className={`catalog ${extraClass}`}>
      {renderTitle()}

      {renderTabs && renderTabs()}

      <FilmsListWithState movies={movies} />

      {renderButton && renderButton()}
    </section>
  );
};

Catalog.propTypes = {
  movies: PropTypes.arrayOf(PropType.movie).isRequired,
  extraClassName: PropTypes.string,
  renderTitle: PropTypes.func.isRequired,
  renderTabs: PropTypes.func,
  renderButton: PropTypes.func,
};

export default Catalog;
