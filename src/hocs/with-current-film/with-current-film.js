import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import FilmCard from '../../components/film-card/film-card.jsx';
import withLoading from '../with-loading/with-loading';
import PropType from '../../proptypes.js';

const FilmCardWithState = withLoading(FilmCard);

const withCurrentFilm = (Component) => {
  class WithCurrentFilm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {currentFilm: ``};

      this._setCurrentFilm = this._setCurrentFilm.bind(this);
      this._resetFilm = this._resetFilm.bind(this);
      this._renderFilmCard = this._renderFilmCard.bind(this);
    }

    render() {
      const {movies} = this.props;

      return <Component
        movies={movies}
        renderFilmCard={this._renderFilmCard}
      />;
    }

    _setCurrentFilm(name) {
      this.setState({currentFilm: name});
    }

    _resetFilm() {
      this.setState({currentFilm: ``});
    }

    _renderFilmCard(movie) {
      const {currentFilm} = this.state;

      return (
        <FilmCardWithState
          movie={movie}
          isFull={false}
          handlePreview={(this._setCurrentFilm)}
          stopPreview={this._resetFilm}
          isPlaying={currentFilm === movie.name}
          key={movie.name}
        />
      );
    }
  }

  WithCurrentFilm.propTypes = {
    movies: PropTypes.arrayOf(PropType.movie).isRequired,
  };

  return WithCurrentFilm;
};

export default withCurrentFilm;
