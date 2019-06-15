import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withSignInData from './with-sign-in-data';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withSignInData(MockComponent);

const mock = {
  onAuthUser: jest.fn(),
  history: {
    push: jest.fn(),
    location: {
      search: `redirect=/film/1`,
    }
  }
};

describe(`component returned with withSignInData hoc`, () => {
  it(`is reacts correctly to submitting form event`, () => {
    const {onAuthUser, history} = mock;

    const comp = mount(
        <MockComponentWrapped onAuthUser={onAuthUser} history={history} />
    );

    comp.instance()._handleSubmitForm();

    expect(onAuthUser).toHaveBeenCalledTimes(1);
    expect(comp.state().isLoading).toEqual(true);
  });
});
