const initialState = {
  isServerResponding: true,
};
Object.freeze(initialState);

export const ActionCreator = {
  SET_SERVER_STATUS: (status) => {
    return {
      type: `SET_SERVER_STATUS`,
      payload: status,
    };
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `SET_SERVER_STATUS`:
      return Object.assign({}, state, {
        isServerResponding: action.payload
      });
  }

  return state;
};
