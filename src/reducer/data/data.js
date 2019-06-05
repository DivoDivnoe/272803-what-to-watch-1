const initialState = {
  films: [],
  favorites: [],
  genres: [],
};

Object.freeze(initialState);

export const AppGenre = {
  ALL_GENRES_LABEL: `All`,
  COMEDY_GENRE: `Comedy`,
  CRIME_GENRE: `Crime`,
  DOCUMENTARY_GENRE: `Documentary`,
  DRAMA_GENRE: `Drama`,
  HORROR_GENRE: `Horror`,
  FAMILY_GENRE: `Family`,
  SCIENCE_GENRE: `SciFi`,
  THRILLER_GENRE: `Thriller`,
  ACTION_GENRE: `Action`,
  ADVENTURE_GENRE: `Adventure`,
  FANTASY_GENRE: `Fantasy`,
};

export const appGenres = Object.keys(AppGenre).map((key) => AppGenre[key]);

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

const getGenresFromFilmsList = (films) => {
  return [AppGenre[`ALL_GENRES_LABEL`]].concat(
      appGenres.filter((genre) => films.some((film) => film.genre === genre))
  );
};

export const Operation = {
  loadFilms: () => (dispatch, _getState, api) => {
    return api
      .get(`/films`)
      .then((response) => {
        const films = response.data.map((obj) => transformObjProps(obj));
        const genres = getGenresFromFilmsList(films);

        dispatch(ActionCreator[`LOAD_FILMS`](films));
        dispatch(ActionCreator[`SET_GENRES`](genres));
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
  }),
  SET_GENRES: (genres) => ({
    type: `SET_GENRES`,
    payload: genres,
  })
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `LOAD_FILMS`:
      return Object.assign({}, state, {films: action.payload});
    case `LOAD_FAVORITES`:
      return Object.assign({}, state, {favorites: action.payload});
    case `SET_GENRES`:
      return Object.assign({}, state, {genres: action.payload});
  }

  return state;
};

export default ActionCreator;
