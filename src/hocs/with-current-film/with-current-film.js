import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import FilmCard from '../../components/film-card/film-card.jsx';
import withLoading from '../with-loading/with-loading';
import {appGenres} from '../../reducer/data/data.js';

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
            isPlaying={currentFilm === movie.name}
            key={movie.name}
          />}
      />;
    }

    _setCurrentFilm(name) {
      this.setState({currentFilm: name});
    }

    _resetFilm() {
      this.setState({currentFilm: ``});
    }
  }

  WithCurrentFilm.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      posterImage: PropTypes.string.isRequired,
      previewVideoLink: PropTypes.string.isRequired,
      genre: PropTypes.oneOf(appGenres).isRequired,
    })).isRequired,
  };

  return WithCurrentFilm;
};

export default withCurrentFilm;
