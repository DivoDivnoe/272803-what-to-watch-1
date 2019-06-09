import React from 'react';
import renderer from 'react-test-renderer';
import PlayerMain from './player-main.jsx';

const MockComponent = () => <div />;

const mock = {
  isLoading: false,
  isPlaying: true,
  isFullScreen: false,
  currentTime: 100,
  duration: 1000,
  resetPlayer: jest.fn(),
  togglePlay: jest.fn(),
  toggleFullScreen: jest.fn(),
  switchPlayer: jest.fn(),
  setFullScreen: jest.fn(),
};

describe(`PlayerMain component`, () => {
  const {
    isLoading,
    isPlaying,
    isFullScreen,
    currentTime,
    duration,
    resetPlayer,
    togglePlay,
    toggleFullScreen,
    switchPlayer,
    setFullScreen,
  } = mock;

  it(`renders correctly`, () => {
    const tree = renderer.create(
        <PlayerMain
          renderPlayer={() => <MockComponent />}
          isLoading={isLoading}
          isPlaying={isPlaying}
          isFullScreen={isFullScreen}
          currentTime={currentTime}
          duration={duration}
          resetPlayer={resetPlayer}
          togglePlay={togglePlay}
          toggleFullScreen={toggleFullScreen}
          switchPlayer={switchPlayer}
          setFullScreen={setFullScreen}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
