import React from 'react';
import PropTypes from 'prop-types';

const TabName = {
  all: `All genres`,
  comedy: `Comedies`,
  crime: `Crime`,
  documentary: `Documentary`,
  drama: `Dramas`,
  horror: `Horror`,
  family: `Kids & Family`,
  romance: `Romance`,
  sciFi: `Sci-Fi`,
  thriller: `Thrillers`,
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
  genre: PropTypes.oneOf([
    `all`,
    `comedy`,
    `crime`,
    `documentary`,
    `drama`,
    `horror`,
    `family`,
    `romance`,
    `sciFi`,
    `thriller`,
  ]).isRequired,
  clickHandler: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GenreTabs;
