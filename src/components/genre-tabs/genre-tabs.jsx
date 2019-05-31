import React from 'react';
import PropTypes from 'prop-types';
import {appGenres} from '../../mocks/films';

const TabName = {
  All: `All genres`,
  Comedy: `Comedies`,
  Crime: `Crime`,
  Documentary: `Documentary`,
  Drama: `Dramas`,
  Horror: `Horror`,
  Family: `Kids & Family`,
  Romance: `Romance`,
  SciFi: `Sci-Fi`,
  Thriller: `Thrillers`,
};

const GenreTabs = ({genre, clickHandler, genres}) => {

  return (
    <ul className="catalog__genres-list">
      {genres.map((appGenre, index) => {
        const className = `catalog__genres-item ${appGenre === genre ? `catalog__genres-item--active` : ``}`;

        return (
          <li className={className} key={`tab-${index}`} onClick={(evt) => {
            evt.preventDefault();
            clickHandler(appGenre);
          }}>
            <a href="#" className="catalog__genres-link">
              {TabName[appGenre]}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

GenreTabs.propTypes = {
  genre: PropTypes.oneOf(appGenres).isRequired,
  clickHandler: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GenreTabs;
