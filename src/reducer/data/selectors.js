import NameSpace from '../name-spaces';
import {createSelector} from 'reselect';
import {getGenre} from '../application/selectors';

export const filterFilms = (movies, genre) => {
  if (genre === `All`) {
    return movies;
  }

  return movies.filter((movie) => movie.genre === genre);
};

export const getFilms = (state) => state[NameSpace.DATA].films;
export const getFilteredFilms = createSelector(
    getFilms,
    getGenre,
    (films, genre) => filterFilms(films, genre)
);