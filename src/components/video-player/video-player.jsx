import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
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

  componentDidMount() {
    const {isFull, onUpdateTime, onLoad} = this.props;
    const video = this._videoRef.current;

    video.src = this.props.video;

    video.oncanplaythrough = () => {
      onLoad(Math.round(video.duration));
    };

    if (isFull) {
      video.ontimeupdate = () => {
        onUpdateTime(Math.round(video.currentTime));
      };
    } else {
      video.muted = true;
    }
  }

  componentDidUpdate(prevProps) {
    const video = this._videoRef.current;
    const {isFull, isPlaying} = this.props;

    if (isFull || prevProps.isPlaying !== isPlaying) {
      if (isPlaying) {
        video.play();
      } else {
        video.pause();

        if (!isFull) {
          video.currentTime = 0;
          video.load();
        }
      }
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.oncanplaythrough = null;
    video.ontimeupdate = null;
    video.src = ``;
  }
}

VideoPlayer.propTypes = {
  image: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isFull: PropTypes.bool.isRequired,
  className: PropTypes.string,
  size: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
  }),
  onLoad: PropTypes.func.isRequired,
  onUpdateTime: PropTypes.func.isRequired,
};

export default VideoPlayer;
