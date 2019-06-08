import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
  }

  componentDidMount() {
    const {isFull, updateTimeHandler} = this.props;
    const video = this._videoRef.current;

    video.src = this.props.video;

    video.oncanplaythrough = () => {
      this.props.handleLoaded();
    };

    if (isFull) {
      // video.ontimeupdate = () => {
      //   updateTimeHandler();
      // };
    } else {
      video.muted = true;
    }
  }

  componentDidUpdate() {
    const video = this._videoRef.current;
    const {isFull, isPlaying, currentTime} = this.props;

    if (isPlaying) {
      video.play();
    } else {
      video.pause();

      if (!isFull) {
        video.currentTime = 0;
        video.load();
      }
    }

    // if (isFull && video.currentTime && video.currentTime !== currentTime) {
    //   video.currentTime = currentTime;
    // }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.oncanplaythrough = null;
    video.src = ``;
  }

  render() {
    const {image, size, className} = this.props;

    return (
      <video
        ref={this._videoRef}
        width={size.width}
        height={size.height}
        poster={image}
        className={className || ``}
      >
      Your browser does not support the video tag.
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  image: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  handleLoaded: PropTypes.func.isRequired,
  isFull: PropTypes.bool.isRequired,
  currentTime: PropTypes.number,
  className: PropTypes.string,
  size: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
  }),
  updateTimeHandler: PropTypes.func,
};

export default VideoPlayer;
