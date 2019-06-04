import NameSpace from '../name-spaces';
import {createSelector} from 'reselect';
import {getGenre} from '../application/selectors';
import {AppGenre} from './data';

export const filterFilms = (movies, genre) => {
  if (genre === AppGenre.ALL_GENRES_LABEL) {
    return movies;
  }

  return movies.filter((movie) => movie.genre === genre);
};

export const getFilms = (state) => state[NameSpace.DATA].films;
export const getFavorites = (state) => state[NameSpace.DATA].favorites;
export const getGenres = (state) => state[NameSpace.DATA].genres;
export const getFilteredFilms = createSelector(
    getFilms,
    getGenre,
    (films, genre) => filterFilms(films, genre)
);
