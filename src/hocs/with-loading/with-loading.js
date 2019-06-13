import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../../components/video-player/video-player.jsx';
import PropType from '../../proptypes.js';

const withLoading = (Component) => {
  class WithLoading extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isLoading: true,
        duration: 0,
        currentTime: 0,
      };

      this._handleLoaded = this._handleLoaded.bind(this);
      this._handleSetCurrentTime = this._handleSetCurrentTime.bind(this);
      this._renderPlayer = this._renderPlayer.bind(this);
    }

    render() {
      const {isLoading, duration, currentTime} = this.state;

      return <Component
        {...this.props}
        isLoading={isLoading}
        currentTime={currentTime}
        duration={duration}
        renderPlayer={this._renderPlayer}
      />;
    }

    _handleLoaded(duration) {
      this.setState({
        isLoading: false,
        duration,
      });
    }

    _handleSetCurrentTime(time) {
      this.setState({currentTime: time});
    }

    _renderPlayer(options) {
      const {movie, isPlaying, isFull} = this.props;

      return (
        <VideoPlayer
          image={isFull ? movie.backgroundImage : movie.previewImage}
          video={isFull ? movie.videoLink : movie.previewVideoLink}
          isPlaying={isPlaying}
          size={options.size}
          className={options.className}
          isFull={isFull}
          onLoad={this._handleLoaded}
          onUpdateTime={this._handleSetCurrentTime}
        />
      );
    }
  }

  WithLoading.propTypes = {
    movie: PropType.movie,
    isPlaying: PropTypes.bool.isRequired,
    isFull: PropTypes.bool.isRequired,
  };

  return WithLoading;
};

export default withLoading;
