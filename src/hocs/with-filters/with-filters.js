import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import GenreTabs from '../../components/genre-tabs/genre-tabs.jsx';
import {AppGenre} from '../../reducer/data/data';

const FILMS_PER_CHUNK = 20;

const withFilters = (Component) => {
  class WithFilters extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        genre: AppGenre.ALL_GENRES_LABEL,
        chunks: 1,
      };

      this._showMore = this._showMore.bind(this);
      this._renderButton = this._renderButton.bind(this);
      this._setGenre = this._setGenre.bind(this);
      this._resetGenre = this._resetGenre.bind(this);
      this._resetChunks = this._resetChunks.bind(this);
      this._getGenreFilteredMovies = this._getGenreFilteredMovies.bind(this);
      this._getSlicedMovies = this._getSlicedMovies.bind(this);
    }

    render() {
      const {genres, renderTitle} = this.props;
      const {genre} = this.state;

      return (
        <Component
          movies={this._getSlicedMovies(this._getGenreFilteredMovies())}
          renderTitle={renderTitle}
          renderTabs={() => (
            <GenreTabs
              genre={genre}
              genres={genres}
              clickHandler={(curGenre) => {
                this._resetChunks();
                this._setGenre(curGenre);
              }}
            />
          )}
          renderButton={this._renderButton}
        />
      );
    }

    _renderButton() {
      const {chunks} = this.state;

      return chunks * FILMS_PER_CHUNK < this._getGenreFilteredMovies().length && (
        <div className="catalog__more">
          <button className="catalog__button" type="button" onClick={this._showMore}>
            Show more
          </button>
        </div>
      );
    }

    _showMore() {
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

    _setGenre(genre) {
      this.setState({genre});
    }

    _resetGenre() {
      this.setState({genre: AppGenre.ALL_GENRES_LABEL});
    }

    _resetChunks() {
      this.setState({chunks: 1});
    }
  }

  WithFilters.propTypes = {
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    movies: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      posterImage: PropTypes.string.isRequired,
    })).isRequired,
    renderTitle: PropTypes.func.isRequired,
  };

  return WithFilters;
};

export default withFilters;
