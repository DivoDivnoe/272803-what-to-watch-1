import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
  }

  componentDidMount() {
    const video = this._videoRef.current;

    video.src = this.props.preview;
    video.muted = true;

    video.oncanplaythrough = () => {
      this.props.handleLoaded();
    };
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
      video.load();
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.oncanplaythrough = null;
    video.onmouseenter = null;
    video.src = ``;
  }

  render() {
    const {image} = this.props;

    return (
      <video
        ref={this._videoRef}
        width="280"
        height="175"
        poster={image}
      >
      Your browser does not support the video tag.
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  image: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  handleLoaded: PropTypes.func.isRequired,
};

export default VideoPlayer;
