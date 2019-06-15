import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from './video-player.jsx';

const mock = {
  image: ``,
  video: ``,
  isPlaying: false,
  isFull: false,
  className: `f`,
  size: {
    width: `300`,
    height: `150`,
  },
  onLoad: jest.fn(),
  onUpdateTime: jest.fn(),
};

describe(`VideoPlayer component`, () => {
  it(`renders correctly`, () => {
    const {
      image,
      video,
      isPlaying,
      isFull,
      className,
      size,
      onUpdateTime,
      onLoad,
    } = mock;

    const tree = renderer.create(
        <VideoPlayer
          image={image}
          video={video}
          isPlaying={isPlaying}
          isFull={isFull}
          className={className}
          size={size}
          onUpdateTime={onUpdateTime}
          onLoad={onLoad}
        />,
        {createNodeMock: (el) => {
          return el;
        }}).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
