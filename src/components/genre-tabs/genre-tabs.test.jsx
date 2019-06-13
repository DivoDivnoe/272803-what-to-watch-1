import React from 'react';
import {create} from 'react-test-renderer';
import GenreTabs from './genre-tabs.jsx';

const mock = {
  genre: `Horror`,
  genres: [`All`, `Crime`, `Thriller`],
  onClick: jest.fn(),
};

describe(`GenreTabs component`, () => {
  it(`renders correctly`, () => {
    const {genre, onClick, genres} = mock;

    const tree = create(
        <GenreTabs genre={genre} onClick={onClick} genres={genres} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
