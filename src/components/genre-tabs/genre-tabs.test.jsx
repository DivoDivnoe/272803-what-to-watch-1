import React from 'react';
import {create} from 'react-test-renderer';
import GenreTabs from './genre-tabs.jsx';

const mock = {
  genre: `horror`,
  clickHandler: jest.fn(),
};

describe(`GenreTabs component`, () => {
  it(`renders correctly`, () => {
    const {genre, clickHandler} = mock;

    const tree = create(
        <GenreTabs genre={genre} clickHandler={clickHandler} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
