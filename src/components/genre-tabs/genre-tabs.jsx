import React from 'react';
import Proptypes from 'prop-types';

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

export const appGenres = Object.keys(TabName);

const GenreTabs = ({genre, clickHandler}) => {

  return (
    <ul className="catalog__genres-list">
      {appGenres.map((appGenre, index) => {
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
  genre: Proptypes.oneOf(appGenres).isRequired,
  clickHandler: Proptypes.func.isRequired,
};

export default GenreTabs;
