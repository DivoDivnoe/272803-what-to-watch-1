import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withPlayerActive from './with-player-active';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withPlayerActive(MockComponent);

const film = {
  id: 1,
  name: `Fantastic Beasts`,
  description: `very interesting film`,
  director: `Steven Spielberg`,
  starring: [`Andrey Ivanov`, `Sergey Rubets`],
  rating: 10,
  scoresCount: 100000,
  backgroundImage: ``,
  backgroundColor: `cyan`,
  released: 2019,
  posterImage: ``,
  genre: `Comedy`,
  previewVideoLink: ``,
  previewImage: ``,
  videoLink: ``,
};

describe(`component returned with withPlayerActive hoc`, () => {
  it(`is rendered with right state`, () => {
    const comp = mount(
        <MockComponentWrapped film={film} />
    );

    expect(comp.state().isPlayerActive).toEqual(false);
  });

  it(`reacts correctly to toggling state`, () => {
    const comp = mount(
        <MockComponentWrapped film={film} />
    );

    comp.instance()._handleTogglePlayerMode();
    comp.update();
    expect(comp.find(`.player`).length).toEqual(1);
  });
});
