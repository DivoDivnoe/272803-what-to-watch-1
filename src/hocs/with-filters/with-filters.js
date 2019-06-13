import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import GenreTabs from '../../components/genre-tabs/genre-tabs.jsx';
import {AppGenre} from '../../constants';
import PropType from '../../proptypes.js';

const FILMS_PER_CHUNK = 20;

const withFilters = (Component) => {
  class WithFilters extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        genre: AppGenre.ALL_GENRES_LABEL,
        chunks: 1,
      };

      this._handleClick = this._handleClick.bind(this);
      this._renderButton = this._renderButton.bind(this);
      this._handleSetGenre = this._handleSetGenre.bind(this);
      this._handleResetGenre = this._handleResetGenre.bind(this);
      this._handleResetChunks = this._handleResetChunks.bind(this);
      this._getGenreFilteredMovies = this._getGenreFilteredMovies.bind(this);
      this._getSlicedMovies = this._getSlicedMovies.bind(this);
      this._renderTabs = this._renderTabs.bind(this);
    }

    render() {
      const {renderTitle} = this.props;

      return (
        <Component
          movies={this._getSlicedMovies(this._getGenreFilteredMovies())}
          renderTitle={renderTitle}
          renderTabs={this._renderTabs}
          renderButton={this._renderButton}
        />
      );
    }

    _renderTabs() {
      const {genres} = this.props;
      const {genre} = this.state;

      return (
        <GenreTabs
          genre={genre}
          genres={genres}
          onClick={(curGenre) => {
            this._handleResetChunks();
            this._handleSetGenre(curGenre);
          }}
        />
      );
    }

    _renderButton() {
      const {chunks} = this.state;

      return chunks * FILMS_PER_CHUNK < this._getGenreFilteredMovies().length && (
        <div className="catalog__more">
          <button className="catalog__button" type="button" onClick={this._handleClick}>
            Show more
          </button>
        </div>
      );
    }

    _handleClick() {
      const {chunks} = this.state;

      if (chunks * FILMS_PER_CHUNK < this._getGenreFilteredMovies().length) {
        this.setState({chunks: this.state.chunks + 1});
      }
    }

    _getGenreFilteredMovies() {
      const {movies} = this.props;
      const {genre} = this.state;


      if (genre === AppGenre.ALL_GENRES_LABEL) {
        return movies;
      }

      return movies.filter((movie) => movie.genre === genre);
    }

    _getSlicedMovies() {
      const {chunks} = this.state;

      const filteredMovies = this._getGenreFilteredMovies();

      return filteredMovies.slice(0, chunks * FILMS_PER_CHUNK);
    }

    _handleSetGenre(genre) {
      this.setState({genre});
    }

    _handleResetGenre() {
      this.setState({genre: AppGenre.ALL_GENRES_LABEL});
    }

    _handleResetChunks() {
      this.setState({chunks: 1});
    }
  }

  WithFilters.propTypes = {
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    movies: PropTypes.arrayOf(PropType.movie).isRequired,
    renderTitle: PropTypes.func.isRequired,
  };

  return WithFilters;
};

export default withFilters;
