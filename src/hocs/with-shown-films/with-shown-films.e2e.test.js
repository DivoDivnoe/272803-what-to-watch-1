import React from 'react';
import {configure, mount} from 'enzyme';
import PropTypes from 'prop-types';
import Adapter from 'enzyme-adapter-react-16';
import withShownFilms from './with-shown-films';

configure({adapter: new Adapter()});

const MockComponent = (props) => (
  <div>
    {props.renderButton()}
  </div>
);

const MockComponentWrapped = withShownFilms(MockComponent);

describe(`component returned with withShownFilms hoc`, () => {
  it(`reacts correctly to clicking the button`, () => {
    const mock = {
      movies: Array.from({length: 25}, () => {}),
      renderTabs: jest.fn(),
    };

    const comp = mount(
        <MockComponentWrapped
          movies={mock.movies}
          renderTabs={mock.renderTabs}
        />
    );

    expect(comp.state().iter).toEqual(1);

    comp.find(`button`).simulate(`click`);
    expect(comp.state().iter).toEqual(2);
  });

  it(`has no button, when there are less then 21 movies`, () => {
    const mock = {
      movies: Array.from({length: 20}, () => {}),
      renderTabs: jest.fn(),
    };

    const comp = mount(
        <MockComponentWrapped
          movies={mock.movies}
          renderTabs={mock.renderTabs}
        />
    );

    expect(comp.find(`button`)).toHaveLength(0);
  });
});

MockComponent.propTypes = {
  renderButton: PropTypes.func.isRequired
};
