const initialState = {
  genre: `All`,
};

Object.freeze(initialState);


const ActionCreator = {
  GENRE_FILTER: (genre) => ({
    type: `GENRE_FILTER`,
    payload: genre,
  }),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `GENRE_FILTER`:
      return Object.assign({}, state, {genre: action.payload});
  }

  return state;
};

export default ActionCreator;
