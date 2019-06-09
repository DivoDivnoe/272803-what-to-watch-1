import {transformObjProps} from '../../utils/utils';
import {StatusCode} from '../../constants';

const initialState = {
  userData: {},
};
Object.freeze(initialState);

const dispatchUserData = (dispatch, response) => {
  const transformedData = transformObjProps(response.data);

  dispatch(ActionCreator[`SET_USER_DATA`](transformedData));
};

export const Operation = {
  setUserData: (userData, onSuccess, onFail) => (dispatch, _getState, api) => {
    return api.post(`/login`, userData)
      .then((response) => {
        if (response.status === StatusCode.OK) {
          dispatchUserData(dispatch, response);
          onSuccess();
        }
      })
      .catch((error) => {
        const {status} = error.response;

        if (status === StatusCode.FORBIDDEN || status === StatusCode.BAD_REQUEST) {
          onFail(status);
        }
      });
  },
  checkIsAuthUser: () => (dispatch, _getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatchUserData(dispatch, response);
      })
      .catch((error) => error);
  }
};

const ActionCreator = {
  SET_USER_DATA: (data) => {
    return {
      type: `SET_USER_DATA`,
      payload: data,
    };
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `SET_USER_DATA`:
      return Object.assign({}, state, {
        userData: action.payload,
      });
  }

  return state;
};

export default ActionCreator;
