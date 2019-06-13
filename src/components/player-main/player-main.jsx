import React from 'react';
import PropTypes from 'prop-types';
import Fullscreen from 'react-full-screen';
import Preloader from '../preloader/preloader.jsx';
import {parseTime} from '../../utils/utils';

const renderButtonContent = (isPlaying) => {
  if (isPlaying) {
    return (
      <React.Fragment>
        <svg viewBox="0 0 14 21" width="14" height="21">
          <use xlinkHref="#pause"></use>
        </svg>
        <span>Pause</span>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </React.Fragment>
  );
};

const PlayerMain = (props) => {
  const {
    currentTime,
    duration,
    isLoading,
    renderPlayer,
    isPlaying,
    isFullScreen,
    onSwitchPlayer,
    onTogglePlay,
    onToggleFullScreen,
    onSetFullScreen,
  } = props;

  const timeElapsed = parseTime(duration - currentTime);

  return (
    <Fullscreen
      enabled={isFullScreen}
      onChange={(isFull) => onSetFullScreen(isFull)}
    >
      <div className="player">
        {isLoading && <Preloader />}
        {renderPlayer({
          size: {width: `100%`, height: `100%`},
          className: `player__video`
        })}

        <button type="button" className="player__exit" onClick={onSwitchPlayer}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={currentTime} max={duration}></progress>
              <div className="player__toggler" style={{left: `${currentTime * 100 / duration}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">
              {`${timeElapsed.hours}:${timeElapsed.minutes}:${timeElapsed.seconds}`}
            </div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play" onClick={onTogglePlay}>
              {renderButtonContent(isPlaying)}
            </button>
            <div className="player__name">Transpotting</div>

            <button type="button" className="player__full-screen" onClick={onToggleFullScreen}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </Fullscreen>
  );
};

PlayerMain.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  onResetPlayer: PropTypes.func.isRequired,
  onTogglePlay: PropTypes.func.isRequired,
  onToggleFullScreen: PropTypes.func.isRequired,
  onSwitchPlayer: PropTypes.func.isRequired,
  onSetFullScreen: PropTypes.func.isRequired,
};

export default PlayerMain;
