import React from 'react';
import PropTypes from 'prop-types';
import MovieHeroDesc from '../movie-hero-desc/movie-hero-desc.jsx';
import MovieHeroHead from '../movie-hero-head/movie-hero-head.jsx';
import PropType from '../../proptypes';

const MovieHero = (props) => {
  const {
    userData,
    movie,
    onSwitchPlayer,
    onSetToFavorites,
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

          {!!Object.keys(movie).length && <MovieHeroDesc
            reviewsLinkRequired={false}
            movie={movie}
            isInList={isInList}
            onSwitchPlayer={onSwitchPlayer}
            onSetToFavorites={onSetToFavorites}
          />}
        </div>
      </div>
    </section>
  );
};

MovieHero.propTypes = {
  userData: PropType.userData,
  movie: PropType.movie,
  isInList: PropTypes.bool.isRequired,
  onSwitchPlayer: PropTypes.func.isRequired,
  onSetToFavorites: PropTypes.func.isRequired,
};

export default MovieHero;

