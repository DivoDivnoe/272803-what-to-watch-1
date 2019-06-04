import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {appGenres} from '../../reducer/data/data.js';

const FILMS_ITER_AMOUNT = 20;

const withShowFilms = (Component) => {
  class WithShowFilms extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {iter: 1};

      this._showMore = this._showMore.bind(this);
      this._renderButton = this._renderButton.bind(this);
    }

    render() {
      const {movies, renderTabs} = this.props;
      const {iter} = this.state;

      const slicedMovies = movies.slice(0, iter * FILMS_ITER_AMOUNT);

      return (
        <Component
          movies={slicedMovies}
          renderTabs={renderTabs}
          renderButton={this._renderButton}
        />
      );
    }

    _showMore() {
      const {iter} = this.state;
      const {movies} = this.props;

      if (iter * FILMS_ITER_AMOUNT < movies.length) {
        this.setState({iter: this.state.iter + 1});
      }
    }

    _renderButton() {
      const {movies} = this.props;
      const {iter} = this.state;

      return iter * FILMS_ITER_AMOUNT < movies.length && (
        <div className="catalog__more">
          <button className="catalog__button" type="button" onClick={this._showMore}>
            Show more
          </button>
        </div>
      );
    }
  }

  WithShowFilms.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      posterImage: PropTypes.string.isRequired,
      previewVideoLink: PropTypes.string.isRequired,
      genre: PropTypes.oneOf(appGenres).isRequired,
    })).isRequired,
    renderTabs: PropTypes.func.isRequired,
  };

  return WithShowFilms;
};

export default withShowFilms;
