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

      this._handleTogglePlay = this._handleTogglePlay.bind(this);
      this._handleToggleFullScreen = this._handleToggleFullScreen.bind(this);
      this._handleSetFullScreen = this._handleSetFullScreen.bind(this);
      this._handleResetState = this._handleResetState.bind(this);
    }

    render() {
      const {isPlaying, isFullScreen} = this.state;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          isFullScreen={isFullScreen}
          isFull={true}
          onResetPlayer={this._handleResetState}
          onTogglePlay={this._handleTogglePlay}
          onToggleFullScreen={this._handleToggleFullScreen}
          onSetFullScreen={this._handleSetFullScreen}
        />
      );
    }

    _handleTogglePlay() {
      this.setState({
        isPlaying: !this.state.isPlaying,
      });
    }

    _handleToggleFullScreen() {
      this.setState({
        isFullScreen: !this.state.isFullScreen,
      });
    }

    _handleSetFullScreen(isFull) {
      this.setState({
        isFullScreen: isFull,
      });
    }

    _handleResetState() {
      this.setState({
        isPlaying: false,
        isFullScreen: false,
      });
    }
  }

  WithPlayerControls.propTypes = {
    movie: PropType.movie,
  };

  return WithPlayerControls;
};

export default withPlayerControls;
