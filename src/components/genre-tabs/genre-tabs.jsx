import React from 'react';
import PropTypes from 'prop-types';
import {appGenres, AppGenre} from '../../constants';

const TabName = {
  [AppGenre.ALL_GENRES_LABEL]: `All genres`,
  [AppGenre.COMEDY_GENRE]: `Comedies`,
  [AppGenre.CRIME_GENRE]: `Crime`,
  [AppGenre.DOCUMENTARY_GENRE]: `Documentary`,
  [AppGenre.DRAMA_GENRE]: `Dramas`,
  [AppGenre.HORROR_GENRE]: `Horror`,
  [AppGenre.FAMILY_GENRE]: `Kids & Family`,
  [AppGenre.ROMANCE_GENRE]: `Romance`,
  [AppGenre.SCIENCE_GENRE]: `Sci-Fi`,
  [AppGenre.THRILLER_GENRE]: `Thrillers`,
  [AppGenre.ACTION_GENRE]: `Actions`,
  [AppGenre.ADVENTURE_GENRE]: `Adventures`,
  [AppGenre.FANTASY_GENRE]: `Fantasy`,
};

const GenreTabs = (props) => {
  const {genre, genres, onClick} = props;

  return (
    <ul className="catalog__genres-list">
      {genres.map((appGenre, index) => {
        const className = `catalog__genres-item ${appGenre === genre ? `catalog__genres-item--active` : ``}`;

        return (
          <li className={className} key={`tab-${index}`} onClick={(evt) => {
            evt.preventDefault();

            onClick(appGenre);
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
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GenreTabs;
