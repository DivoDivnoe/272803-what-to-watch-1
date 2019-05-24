import films from '../mocks/films';

const initialState = {
  genre: `all`,
  films,
};

Object.freeze(initialState);

const ActionCreator = {
  GENRE_FILTER: (genre) => ({
    type: `GENRE_FILTER`,
    filter: genre,
  })
};

export const filterFilms = (movies, genre) => {
  if (genre === `all`) {
    return movies;
  }

  return movies.filter((movie) => movie.genre === genre);
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `GENRE_FILTER`:
      return Object.assign({}, state, {genre: action.filter});
  }

  return state;
};

export default ActionCreator;
