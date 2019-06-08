import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {appGenres} from '../../reducer/data/data';

const withPlayerControls = (Component) => {
  class WithPlayerControls extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: true,
        isFullScreen: false,
        currentTime: 0,
      };

      this._togglePlay = this._togglePlay.bind(this);
      this._toggleFullScreen = this._toggleFullScreen.bind(this);
      this._setCurrentTime = this._setCurrentTime.bind(this);
      this._setFullScreen = this._setFullScreen.bind(this);
    }

    _togglePlay() {
      this.setState({
        isPlaying: !this.state.isPlaying,
      });
    }

    _toggleFullScreen() {
      this.setState({
        isFullScreen: !this.state.isFullScreen,
      });
    }

    _setFullScreen(isFull) {
      this.setState({
        isFullScreen: isFull,
      });
    }

    _setCurrentTime(time) {
      this.setState({
        currentTime: time,
      });
    }

    _resetState() {
      this.setState({
        isPlaying: false,
        isFullScreen: false,
        currentTime: 0,
      });
    }

    render() {
      const {isPlaying, isFullScreen, currentTime} = this.state;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          isFullScreen={isFullScreen}
          currentTime={currentTime}
          setCurrentTime={this._setCurrentTime}
          resetPlayer={this._resetState}
          togglePlay={this._togglePlay}
          toggleFullScreen={this._toggleFullScreen}
          setFullScreen={this._setFullScreen}
          isFull={true}
        />
      );
    }
  }

  WithPlayerControls.propTypes = {
    movie: PropTypes.shape({
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
    }),
  };

  return WithPlayerControls;
};

export default withPlayerControls;
