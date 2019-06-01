import React from 'react';
import {create} from 'react-test-renderer';
import GenreTabs from './genre-tabs.jsx';

const mock = {
  genre: `Horror`,
  clickHandler: jest.fn(),
  genres: [`All`, `Crime`, `Thriller`],
};

describe(`GenreTabs component`, () => {
  it(`renders correctly`, () => {
    const {genre, clickHandler, genres} = mock;

    const tree = create(
        <GenreTabs genre={genre} clickHandler={clickHandler} genres={genres} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
