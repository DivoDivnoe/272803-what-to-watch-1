import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {appGenres} from '../../reducer/data/data';

const withPlayerActive = (Component) => {
  class WithPlayerActive extends PureComponent {
    constructor(props) {
      super(props);

      const {movies} = this.props;

      this.state = {
        isPlayerActive: false,
        movie: movies[Math.floor(Math.random() * movies.length)] || {},
      };

      this._togglePlayerMode = this._togglePlayerMode.bind(this);
    }

    componentDidUpdate(prevProps) {
      const {movies} = this.props;

      if (!prevProps.movies.length && movies.length) {
        this.setState({
          movie: movies[Math.floor(Math.random() * movies.length)],
        });
      }
    }

    _togglePlayerMode() {
      this.setState({isPlayerActive: !this.state.isPlayerActive});
    }

    render() {
      const {isPlayerActive} = this.state;


      return (
        <Component
          {...this.props}
          isPlayerActive={isPlayerActive}
          movie={this.state.movie}
          switchPlayer={this._togglePlayerMode}
        />
      );
    }
  }

  WithPlayerActive.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      posterImage: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      starring: PropTypes.arrayOf(PropTypes.string).isRequired,
      rating: PropTypes.number.isRequired,
      scoresCount: PropTypes.number.isRequired,
      backgroundImage: PropTypes.string.isRequired,
      backgroundColor: PropTypes.string.isRequired,
      released: PropTypes.number.isRequired,
      genre: PropTypes.oneOf(appGenres).isRequired,
    })).isRequired,
  };

  return WithPlayerActive;
};

export default withPlayerActive;
