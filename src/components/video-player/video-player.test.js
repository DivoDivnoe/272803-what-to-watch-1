import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from './video-player.jsx';

const mock = {
  image: `https://vokrug.tv/pic/news/d/d/8/4/dd84fb57fee799d831753daa2e0eb07e.jpg`,
  preview: ``,
  handleLoaded: jest.fn(),
  isPlaying: false,
};

describe(`VideoPlayer component`, () => {
  it(`renders correctly`, () => {
    const {image, preview, handleLoaded, isPlaying} = mock;

    const tree = renderer.create(
        <VideoPlayer
          image={image}
          preview={preview}
          handleLoaded={handleLoaded}
          isPlaying={isPlaying}
        />,
        {createNodeMock: (el) => {
          return el;
        }}).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
