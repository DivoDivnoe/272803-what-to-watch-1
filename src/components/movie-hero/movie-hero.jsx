import React from 'react';
import PropTypes from 'prop-types';
import MovieHeroDesc from '../movie-hero-desc/movie-hero-desc.jsx';
import MovieHeroHead from '../movie-hero-head/movie-hero-head.jsx';
import PropType from '../../proptypes';

const MovieHero = (props) => {
  const {
    userData,
    movie,
    switchPlayer,
    setToFavoritesHandler,
    isInList,
  } = props;

  return (
    <section className="movie-card">
      <MovieHeroHead movie={movie} userData={userData} isMainPage={true} />

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img
              src={movie.posterImage}
              alt={movie.name}
              width="218"
              height="327"
            />
          </div>

          <MovieHeroDesc
            reviewsLinkRequired={false}
            movie={movie}
            switchPlayer={switchPlayer}
            setToFavoritesHandler={setToFavoritesHandler}
            isInList={isInList}
          />
        </div>
      </div>
    </section>
  );
};

MovieHero.propTypes = {
  userData: PropType.userData,
  movie: PropType.movie,
  switchPlayer: PropTypes.func.isRequired,
  setToFavoritesHandler: PropTypes.func.isRequired,
  isInList: PropTypes.bool.isRequired,
};

export default MovieHero;

