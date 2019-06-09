import React, {PureComponent} from 'react';
import PropType from '../../proptypes.js';

const withPlayerControls = (Component) => {
  class WithPlayerControls extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: true,
        isFullScreen: false,
      };

      this._togglePlay = this._togglePlay.bind(this);
      this._toggleFullScreen = this._toggleFullScreen.bind(this);
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

    _resetState() {
      this.setState({
        isPlaying: false,
        isFullScreen: false,
      });
    }

    render() {
      const {isPlaying, isFullScreen} = this.state;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          isFullScreen={isFullScreen}
          resetPlayer={this._resetState}
          togglePlay={this._togglePlay}
          toggleFullScreen={this._toggleFullScreen}
          setFullScreen={this._setFullScreen}
          setDuration={this._setDuration}
          isFull={true}
        />
      );
    }
  }

  WithPlayerControls.propTypes = {
    movie: PropType.movie,
  };

  return WithPlayerControls;
};

export default withPlayerControls;
