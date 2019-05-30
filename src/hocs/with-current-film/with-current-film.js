import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import FilmCard from '../../components/film-card/film-card.jsx';
import withLoading from '../with-loading/with-loading';
import {appGenres} from '../../mocks/films';

const FilmCardWithState = withLoading(FilmCard);

const withCurrentFilm = (Component) => {
  class WithCurrentFilm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {currentFilm: ``};

      this._setCurrentFilm = this._setCurrentFilm.bind(this);
      this._resetFilm = this._resetFilm.bind(this);
    }

    render() {
      const {movies} = this.props;
      const {currentFilm} = this.state;

      return <Component
        movies={movies}
        renderFilmCard={(movie) =>
          <FilmCardWithState
            movie={movie}
            handlePreview={(this._setCurrentFilm)}
            stopPreview={this._resetFilm}
            isPlaying={currentFilm === movie.title}
            key={movie.title}
          />}
      />;
    }

    _setCurrentFilm(title) {
      this.setState({currentFilm: title});
    }

    _resetFilm() {
      this.setState({currentFilm: ``});
    }
  }

  WithCurrentFilm.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      preview: PropTypes.string.isRequired,
      genre: PropTypes.oneOf(appGenres).isRequired,
    })).isRequired,
  };

  return WithCurrentFilm;
};

export default withCurrentFilm;
