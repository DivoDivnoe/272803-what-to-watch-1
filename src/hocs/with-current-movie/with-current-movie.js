import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PropType from '../../proptypes.js';

const SIMILAR_FILMS_AMOUNT = 4;

const withCurrentMovie = (Component) => {
  class WithCurrentMovie extends PureComponent {
    constructor(props) {
      super(props);

      const {match} = this.props;

      const film = this._getFilmById(+match.params.id);
      const similarFilms = this._getSimilarFilmsById(film);

      this.state = {film, similarFilms};
    }

    render() {
      const {film, similarFilms} = this.state;
      const {movies} = this.props;

      if (movies.length && !Object.keys(film).length) {
        return <h1>Requested Film does not Exist</h1>;
      }

      return (
        <Component
          {...this.props}
          film={film}
          similarFilms={similarFilms}
        />
      );
    }

    componentDidUpdate(prevProps) {
      const {movies, match} = this.props;

      if (!prevProps.movies.length && movies.length || prevProps.match.params.id !== match.params.id) {
        const film = this._getFilmById(+match.params.id);
        const similarFilms = this._getSimilarFilmsById(film);

        this.setState({film, similarFilms});
      }
    }

    _getFilmById(id) {
      const {movies} = this.props;

      return movies.find((movie) => movie.id === id) || {};
    }

    _getSimilarFilmsById(film) {
      const {movies} = this.props;

      return movies
        .filter((movie) => movie.genre === film.genre && movie.name !== film.name)
        .sort(() => Math.random() - 0.5)
        .slice(0, SIMILAR_FILMS_AMOUNT);
    }
  }

  WithCurrentMovie.propTypes = {
    movies: PropTypes.arrayOf(PropType.movie).isRequired,
    match: PropTypes.object.isRequired,
  };

  return WithCurrentMovie;
};

export default withCurrentMovie;
