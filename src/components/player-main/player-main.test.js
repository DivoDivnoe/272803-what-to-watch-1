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
  onResetPlayer: jest.fn(),
  onTogglePlay: jest.fn(),
  onToggleFullScreen: jest.fn(),
  onSwitchPlayer: jest.fn(),
  onSetFullScreen: jest.fn(),
};

describe(`PlayerMain component`, () => {
  const {
    isLoading,
    isPlaying,
    isFullScreen,
    currentTime,
    duration,
    onResetPlayer,
    onTogglePlay,
    onToggleFullScreen,
    onSwitchPlayer,
    onSetFullScreen,
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
          onResetPlayer={onResetPlayer}
          onTogglePlay={onTogglePlay}
          onToggleFullScreen={onToggleFullScreen}
          onSwitchPlayer={onSwitchPlayer}
          onSetFullScreen={onSetFullScreen}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
