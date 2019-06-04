import {transformObjProps} from '../data/data';

const initialState = {
  isAuthorizationRequired: false,
  userData: {},
};
Object.freeze(initialState);

const dispatchUserData = (dispatch, response) => {
  const transformedData = transformObjProps(response.data);

  dispatch(ActionCreator[`SET_USER_DATA`](transformedData));

  console.log('data', transformedData);
};

export const Operation = {
  setUserData: (userData, callback) => (dispatch, _getState, api) => {
    return api.post(`/login`, userData)
      .then((response) => {
        dispatchUserData(dispatch, response);
        callback();
      });
  },
  checkIsAuthUser: () => (dispatch, _getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatchUserData(dispatch, response);
      });
  }
};

const ActionCreator = {
  REQUIRED_AUTHORIZATION: (status) => {
    return {
      type: `REQUIRED_AUTHORIZATION`,
      payload: status,
    };
  },
  SET_USER_DATA: (data) => {
    return {
      type: `SET_USER_DATA`,
      payload: data,
    };
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `REQUIRED_AUTHORIZATION`:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
    case `SET_USER_DATA`:
      return Object.assign({}, state, {
        userData: action.payload,
      });
  }

  return state;
};

export default ActionCreator;
