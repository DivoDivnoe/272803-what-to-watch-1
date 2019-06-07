import React from 'react';
import PropTypes from 'prop-types';
import MovieHeroButton from '../movie-hero-button/move-hero-button.jsx';
import Header from '../header/header.jsx';
import Logo from '../logo/logo.jsx';
import UserBlock from '../user-block/user-block.jsx';
import {appGenres} from '../../reducer/data/data';

const MovieHero = (props) => {
  const {userData, renderPlayer, movie, isPlaying, isPlayingMode} = props;

  return (
    <section className="movie-card">
      <div className="movie-card__bg" style={{backgroundColor: movie.backgroundColor}}>
        {!isPlayingMode && <img src={movie.backgroundImage} alt={movie.name}/>}
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header extraClassName="movie-card__head">
        <Logo isMainPage={true} isLight={false} />
        <UserBlock userData={userData} />
      </Header>

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            {<img
              src={movie.posterImage}
              alt={movie.name}
              width="218"
              height="327"
            />}
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{movie.name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{movie.genre}</span>
              <span className="movie-card__year">{movie.released}</span>
            </p>

            <div className="movie-card__buttons">
              {[`play`, `list`].map((type, index) => <MovieHeroButton type={type} key={`${type}-${index}`} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

MovieHero.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
  }),
  renderPlayer: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    genre: PropTypes.oneOf(appGenres).isRequired,
    videoLink: PropTypes.string.isRequired,
  }),
};

export default MovieHero;

