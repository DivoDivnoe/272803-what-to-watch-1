const HOST_NAME = `https://es31-server.appspot.com`;

const StatusCode = {
  OK: 200,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
};

const AppGenre = {
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

const appGenres = Object.keys(AppGenre).map((key) => AppGenre[key]);

export {
  StatusCode,
  AppGenre,
  appGenres,
  HOST_NAME,
};
