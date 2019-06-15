import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withPlayerControls from './with-player-controls';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;

const MockComponentWrapped = withPlayerControls(MockComponent);

describe(`component returned with withPlayerControls hoc`, () => {
  it(`is rendered with right state`, () => {
    const comp = mount(
        <MockComponentWrapped />
    );

    expect(comp.state().isPlaying).toEqual(true);
    expect(comp.state().isFullScreen).toEqual(false);
  });
});
