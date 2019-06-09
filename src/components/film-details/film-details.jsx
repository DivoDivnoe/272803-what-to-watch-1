import React from 'react';
import PropType from '../../proptypes.js';

const getStarringArrayWithBR = (arr) => {
  const result = [];

  for (const item of arr.slice(0, arr.length - 1)) {
    result.push(<span key={item}>{item}, </span>, <br key={`${item}-br`} />);
  }

  return result.concat(arr[arr.length - 1]);
};

const FilmDetails = (props) => {
  const {film} = props;

  const FilmDetail = {
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
  };

  const renderDetail = (key) => {
    const detail = FilmDetail[key];

    return (
      <p className="movie-card__details-item" key={key}>
        <strong className="movie-card__details-name">{detail.label}</strong>
        <span className="movie-card__details-value">{detail.item}</span>
      </p>
    );
  };

  const filmDetailKeys = Object.keys(FilmDetail);

  return (
    <div className="movie-card__text movie-card__row">
      {[filmDetailKeys.slice(0, 2), filmDetailKeys.slice(2)].map((item, index) => (
        <div className="movie-card__text-col" key={`film-detail-${index}`}>
          {item.map((key) => renderDetail(key))}
        </div>
      ))}
    </div>
  );
};

FilmDetails.propTypes = {
  film: PropType.movie,
};

export default FilmDetails;
