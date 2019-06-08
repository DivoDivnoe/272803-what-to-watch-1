import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../../components/video-player/video-player.jsx';
import {appGenres} from '../../reducer/data/data';

const withLoading = (Component) => {
  class WithLoading extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {isLoading: true};

      this._handleLoaded = this._handleLoaded.bind(this);
    }

    render() {
      const {movie, isPlaying, isFull} = this.props;
      const {isLoading} = this.state;

      return <Component
        {...this.props}
        isLoading={isLoading}
        renderPlayer={(options) => <VideoPlayer
          image={isFull ? movie.backgroundImage : movie.previewImage}
          video={isFull ? movie.videoLink : movie.previewVideoLink}
          isPlaying={isPlaying}
          handleLoaded={this._handleLoaded}
          size={options.size}
          className={options.className}
          isFull={isFull}
        />}
      />;
    }

    _handleLoaded() {
      this.setState({isLoading: false});
    }
  }

  WithLoading.propTypes = {
    movie: PropTypes.shape({
      name: PropTypes.string.isRequired,
      posterImage: PropTypes.string.isRequired,
      previewVideoLink: PropTypes.string.isRequired,
      genre: PropTypes.oneOf(appGenres).isRequired,
      videoLink: PropTypes.string.isRequired,
    }),
    isPlaying: PropTypes.bool.isRequired,
    isFull: PropTypes.bool.isRequired,
  };

  return WithLoading;
};

export default withLoading;
