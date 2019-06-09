import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from './video-player.jsx';

const mock = {
  image: ``,
  video: ``,
  handleLoaded: jest.fn(),
  isPlaying: false,
  isFull: false,
  className: `f`,
  size: {
    width: `300`,
    height: `150`,
  },
  updateTimeHandler: jest.fn(),
  setDuration: jest.fn(),
};

describe(`VideoPlayer component`, () => {
  it(`renders correctly`, () => {
    const {
      image,
      video,
      handleLoaded,
      isPlaying,
      isFull,
      className,
      size,
      updateTimeHandler,
      setDuration,
    } = mock;

    const tree = renderer.create(
        <VideoPlayer
          image={image}
          video={video}
          handleLoaded={handleLoaded}
          isPlaying={isPlaying}
          isFull={isFull}
          className={className}
          size={size}
          updateTimeHandler={updateTimeHandler}
          setDuration={setDuration}
        />,
        {createNodeMock: (el) => {
          return el;
        }}).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
