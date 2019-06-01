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
