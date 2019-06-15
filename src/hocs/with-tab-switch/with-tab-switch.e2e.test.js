import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import withTabSwitch from './with-tab-switch';

configure({adapter: new Adapter()});

const MockComponent = (props) => (
  <div>
    {props.renderTabs()}
  </div>
);

MockComponent.propTypes = {
  renderTabs: PropTypes.func.isRequired,
};

const MockComponentWrapped = withTabSwitch(MockComponent);

describe(`component returned with withTabSwitch hoc`, () => {
  it(`is rendered with right state`, () => {
    const comp = mount(
        <MockComponentWrapped />
    );

    const clickTabPrevention = jest.fn();

    expect(comp.state().tab).toEqual(`Overview`);

    comp.find(`li`).at(2).simulate(`click`, {
      preventDefault: clickTabPrevention,
    });

    expect(clickTabPrevention).toHaveBeenCalledTimes(1);
    expect(comp.state().tab).toEqual(`Reviews`);
  });
});
