const initialState = {
  films: [],
  favorites: [],
};

Object.freeze(initialState);

export const transformObjProps = (obj) => {
  obj = Object.assign({}, obj);

  const keys = Object.keys(obj);
  const snakeStyleKeys = [];

  keys.forEach((key) => {
    if (key.indexOf(`_`) >= 0) {
      snakeStyleKeys.push(key);

      const keyInCamelCase = key.split(`_`).map((str, index) => {
        if (!index) {
          return str;
        }

        return `${str[0].toUpperCase()}${str.substr(1)}`;
      }).join(``);

      obj[keyInCamelCase] = obj[key];
    }
  });

  snakeStyleKeys.forEach((key) => {
    delete obj[key];
  });

  return obj;
};

export const Operation = {
  loadFilms: () => (dispatch, _getState, api) => {
    return api
      .get(`/films`)
      .then((response) => {
        const films = response.data.map((obj) => transformObjProps(obj));

        return dispatch(ActionCreator[`LOAD_FILMS`](films));
      });
  },
  loadFavorites: () => (dispatch, _getState, api) => {
    return api
      .get(`/favorite`)
      .then((response) => {
        const films = response.data.map((obj) => transformObjProps(obj));

        return dispatch(ActionCreator[`LOAD_FAVORITES`](films));
      });
  }
};

const ActionCreator = {
  LOAD_FILMS: (films) => ({
    type: `LOAD_FILMS`,
    payload: films,
  }),
  LOAD_FAVORITES: (films) => ({
    type: `LOAD_FAVORITES`,
    payload: films,
  })
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `LOAD_FILMS`:
      return Object.assign({}, state, {films: action.payload});
    case `LOAD_FAVORITES`:
      return Object.assign({}, state, {favorites: action.payload});
  }

  return state;
};

export default ActionCreator;
