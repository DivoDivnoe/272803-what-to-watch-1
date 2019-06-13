import {transformObjProps} from '../../utils/utils';
import {StatusCode} from '../../constants';
import {AppGenre, appGenres} from '../../constants';

const initialState = {
  films: [],
  favorites: [],
  genres: [],
  promoFilm: {},
  comments: [],
};

Object.freeze(initialState);

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
        if (response.status === StatusCode.OK) {
          const films = response.data.map((obj) => transformObjProps(obj));
          const genres = getGenresFromFilmsList(films);

          dispatch(ActionCreator[`LOAD_FILMS`](films));
          dispatch(ActionCreator[`SET_GENRES`](genres));
        }
      });
  },
  setToFavorites: (id, status, onFail) => (dispatch, _getState, api) => {
    return api
      .post(`/favorite/${id}/${status}`)
      .then((response) => {
        if (response.status === StatusCode.OK) {
          const film = transformObjProps(response.data);
          const actionType = [`REMOVE_FAVORITE`, `UPDATE_FAVORITES`][status];

          dispatch(ActionCreator[actionType](film));
        }
      })
      .catch((error) => {
        if (error.response.status === StatusCode.FORBIDDEN) {
          onFail();
        }
      });
  },
  loadPromoFilm: () => (dispatch, _getState, api) => {
    return api
      .get(`/films/promo`)
      .then((response) => {
        if (response.status === StatusCode.OK) {
          const film = transformObjProps(response.data);

          dispatch(ActionCreator[`LOAD_PROMO_FILM`](film));
        }
      });
  },
  loadFavorites: () => (dispatch, _getState, api) => {
    return api
      .get(`/favorite`)
      .then((response) => {
        if (response.status === StatusCode.OK) {
          const films = response.data.map((obj) => transformObjProps(obj));

          dispatch(ActionCreator[`LOAD_FAVORITES`](films));
        }
      });
  },
  loadComments: (id) => (dispatch, _getState, api) => {
    return api
      .get(`/comments/${id}`)
      .then((response) => {
        if (response.status === StatusCode.OK) {
          dispatch(ActionCreator[`LOAD_COMMENTS`](response.data));
        }
      });
  },
};

const ActionCreator = {
  LOAD_FILMS: (films) => ({
    type: `LOAD_FILMS`,
    payload: films,
  }),
  LOAD_PROMO_FILM: (film) => ({
    type: `LOAD_PROMO_FILM`,
    payload: film,
  }),
  LOAD_FAVORITES: (films) => ({
    type: `LOAD_FAVORITES`,
    payload: films,
  }),
  UPDATE_FAVORITES: (film) => ({
    type: `UPDATE_FAVORITES`,
    payload: film,
  }),
  REMOVE_FAVORITE: (film) => ({
    type: `REMOVE_FAVORITE`,
    payload: film,
  }),
  SET_GENRES: (genres) => ({
    type: `SET_GENRES`,
    payload: genres,
  }),
  LOAD_COMMENTS: (comments) => ({
    type: `LOAD_COMMENTS`,
    payload: comments,
  }),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `LOAD_FILMS`:
      return Object.assign({}, state, {films: action.payload});
    case `LOAD_FAVORITES`:
      return Object.assign({}, state, {favorites: action.payload});
    case `UPDATE_FAVORITES`:
      return Object.assign({}, state, {favorites: state.favorites.concat(action.payload)});
    case `REMOVE_FAVORITE`:
      const favorites = state.favorites.filter((film) => film.id !== action.payload.id);

      return Object.assign({}, state, {favorites});
    case `SET_GENRES`:
      return Object.assign({}, state, {genres: action.payload});
    case `LOAD_PROMO_FILM`:
      return Object.assign({}, state, {promoFilm: action.payload});
    case `LOAD_COMMENTS`:
      return Object.assign({}, state, {comments: action.payload});
  }

  return state;
};

export default ActionCreator;
