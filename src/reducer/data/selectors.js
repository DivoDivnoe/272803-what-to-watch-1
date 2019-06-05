import NameSpace from '../name-spaces';

export const getFilms = (state) => state[NameSpace.DATA].films;
export const getFavorites = (state) => state[NameSpace.DATA].favorites;
export const getGenres = (state) => state[NameSpace.DATA].genres;
