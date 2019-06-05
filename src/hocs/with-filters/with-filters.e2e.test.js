import React from 'react';
import PropTypes from 'prop-types';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withFilters from './with-filters';
import {AppGenre} from '../../reducer/data/data';

configure({adapter: new Adapter()});

const MockComponent = (props) => (
  <div>
    {props.renderTabs()}
    {props.renderButton()}
  </div>
);

MockComponent.propTypes = {
  renderButton: PropTypes.func.isRequired,
  renderTabs: PropTypes.func.isRequired,
};

const MockComponentWrapped = withFilters(MockComponent);

describe(`component returned with withFilters hoc`, () => {
  it(`has no button, when films amount is less than 20`, () => {
    const mock = {
      genres: [`All`, `Crime`, `Thriller`],
      movies: [
        {
          name: `Fantastic Beasts`,
          posterImage: ``,
          genre: `Comedy`,
          previewVideoLink: ``,
        },
        {
          name: `Major Payne`,
          posterImage: ``,
          genre: `Comedy`,
          previewVideoLink: ``,
        },
      ],
    };
    const {movies, genres} = mock;

    const comp = mount(
        <MockComponentWrapped
          movies={movies}
          genres={genres}
        />
    );

    expect(comp.find(`button`).length).toEqual(0);
  });

  it(`reacts correctly to clicking the button`, () => {
    const mock = {
      genres: [`All`, `Comedy`, `Thriller`],
      movies: Array.from({length: 21}, () => ({
        name: `Major Payne`,
        posterImage: ``,
        genre: `Comedy`,
        previewVideoLink: ``,
      }))
    };
    const {movies, genres} = mock;

    const comp = mount(
        <MockComponentWrapped
          movies={movies}
          genres={genres}
        />
    );

    comp.find(`button`).simulate(`click`);
    expect(comp.state().chunks).toEqual(2);
  });

  it(`reacts correctly to clicking another genre tab`, () => {
    const mock = {
      genres: [`All`, `Crime`, `Thriller`],
      movies: [
        {
          name: `Fantastic Beasts`,
          posterImage: ``,
          genre: `Comedy`,
          previewVideoLink: ``,
        },
        {
          name: `Major Payne`,
          posterImage: ``,
          genre: `Comedy`,
          previewVideoLink: ``,
        },
      ],
    };

    const {movies, genres} = mock;

    const comp = mount(
        <MockComponentWrapped
          movies={movies}
          genres={genres}
        />
    );

    comp.find(`li`).at(1).simulate(`click`);
    expect(comp.state().genre).not.toEqual(AppGenre.ALL_GENRES_LABEL);
  });

  it(`resets chunks to 1 and shows button after changing genre`, () => {
    const mock = {
      genres: [`All`, `Crime`, `Thriller`],
      movies: Array.from({length: 21}, () => ({
        name: `Major Payne`,
        posterImage: ``,
        genre: `Crime`,
        previewVideoLink: ``,
      }))
    };
    const {movies, genres} = mock;

    const comp = mount(
        <MockComponentWrapped
          movies={movies}
          genres={genres}
        />
    );

    comp.find(`button`).simulate(`click`);
    comp.find(`li`).at(1).simulate(`click`);

    expect(comp.state().chunks).toEqual(1);
    expect(comp.find(`button`).length).toEqual(1);
  });
});
