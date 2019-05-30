import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../../components/video-player/video-player.jsx';

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
        movieTitle={movie.title}
        stopPreview={stopPreview}
        handlePreview={handlePreview}
        isLoading={isLoading}
        renderPlayer={() => <VideoPlayer
          image={movie.image}
          preview={movie.preview}
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
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      preview: PropTypes.string.isRequired,
      genre: PropTypes.oneOf([
        `crime`, `thriller`, `comedy`, `family`, `documentary`, `horror`, `drama`
      ]).isRequired,
    }),
    handlePreview: PropTypes.func.isRequired,
    stopPreview: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
  };

  return WithLoading;
};

export default withLoading;
