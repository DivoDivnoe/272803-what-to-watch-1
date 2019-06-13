import {ActionCreator, reducer} from "./application";

describe(`reducer returns right state with`, () => {
  it(`SET_SERVER_STATUS action`, () => {
    const initialState = {
      isServerResponding: true,
    };

    const action = {
      type: `SET_SERVER_STATUS`,
      payload: false,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({isServerResponding: false});
  });
});

describe(`ActionCreator`, () => {
  it(`SET_SERVER_STATUS returns right action`, () => {
    const action = ActionCreator[`SET_SERVER_STATUS`](false);

    expect(action).toEqual({
      type: `SET_SERVER_STATUS`,
      payload: false,
    });
  });
});
