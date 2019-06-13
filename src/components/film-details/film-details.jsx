import React from 'react';
import PropType from '../../proptypes.js';

const getStarringArrayWithBR = (arr) => {
  const result = [];

  for (const item of arr.slice(0, arr.length - 1)) {
    result.push(<span key={item}>{item}, </span>, <br key={`${item}-br`} />);
  }

  return result.concat(arr[arr.length - 1]);
};

const renderDetail = (detail, key) => (
  <p className="movie-card__details-item" key={key}>
    <strong className="movie-card__details-name">{detail.label}</strong>
    <span className="movie-card__details-value">{detail.item}</span>
  </p>
);

const createFilmDetails = (film) => ({
  FILM_DIRECTOR: {
    label: `Director`,
    item: film.director,
  },
  FILM_STARRING: {
    label: `Starring`,
    item: film.starring && getStarringArrayWithBR(film.starring),
  },
  FILM_RUN_TIME: {
    label: `Run Time`,
    item: film.runTime,
  },
  FILM_GENRE: {
    label: `Genre`,
    item: film.genre,
  },
  FILM_RELEASED: {
    label: `Released`,
    item: film.released,
  },
});

const FilmDetails = (props) => {
  const {film} = props;

  const FilmDetail = createFilmDetails(film);
  const filmDetailKeys = Object.keys(FilmDetail);
  const [firstColumnItems, secondColumnItems] = [filmDetailKeys.slice(0, 2), filmDetailKeys.slice(2)];

  return (
    <div className="movie-card__text movie-card__row">
      {[firstColumnItems, secondColumnItems].map((colItems, index) => (
        <div className="movie-card__text-col" key={`film-detail-${index}`}>
          {colItems.map((key) => renderDetail(FilmDetail[key], key))}
        </div>
      ))}
    </div>
  );
};

FilmDetails.propTypes = {
  film: PropType.movie,
};

export default FilmDetails;
