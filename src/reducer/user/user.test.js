import ActionCreator, {reducer, Operation} from "./user";
import createAPI from '../../api';
import MockAdapter from 'axios-mock-adapter';

describe(`reducer returns right state with`, () => {
  it(`SET_USER_DATA action`, () => {
    const initialState = {
      isAuthorizationRequired: true,
      userData: null,
    };

    const userData = {
      email: `some@email.com`,
      id: 2345,
      avatarUrl: `beautiful/pic`,
    };

    const action = {
      type: `SET_USER_DATA`,
      payload: userData,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      isAuthorizationRequired: true,
      userData,
    });
  });
});

describe(`ActionCreator`, () => {
  it(`SET_USER_DATA returns right action`, () => {
    const userData = {
      email: `some@email.com`,
      id: 2345,
    };
    const action = ActionCreator[`SET_USER_DATA`](userData);

    expect(action).toEqual({
      type: `SET_USER_DATA`,
      payload: userData,
    });
  });
});

describe(`setUserData function`, () => {
  it(`should make a correct call to /login`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const userData = {
      email: `some@email.com`,
      password: 2345,
    };

    const userDataLoader = Operation.setUserData(userData);

    apiMock
      .onPost(`/login`)
      .reply(200, [{fake: true}]);

    userDataLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `SET_USER_DATA`,
          payload: [{fake: true}]
        });
      });
  });
});
