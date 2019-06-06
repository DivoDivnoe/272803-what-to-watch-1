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
      const {movie, isPlaying, stopPreview, handlePreview} = this.props;
      const {isLoading} = this.state;

      return <Component
        movieTitle={movie.name}
        movieId={movie.id}
        stopPreview={stopPreview}
        handlePreview={handlePreview}
        isLoading={isLoading}
        renderPlayer={() => <VideoPlayer
          image={movie.previewImage}
          preview={movie.previewVideoLink}
          isPlaying={isPlaying}
          handleLoaded={this._handleLoaded}
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
    }),
    handlePreview: PropTypes.func.isRequired,
    stopPreview: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
  };

  return WithLoading;
};

export default withLoading;
