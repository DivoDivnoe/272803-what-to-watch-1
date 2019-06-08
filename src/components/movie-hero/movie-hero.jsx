import React from 'react';
import PropTypes from 'prop-types';
import MovieHeroButton from '../movie-hero-button/move-hero-button.jsx';
import Header from '../header/header.jsx';
import Logo from '../logo/logo.jsx';
import UserBlock from '../user-block/user-block.jsx';
import {appGenres} from '../../reducer/data/data';

const MovieHero = (props) => {
  const {userData, movie, switchPlayer} = props;
  const buttonObjs = [
    {type: `play`, handler: switchPlayer},
    {type: `list`, handler: () => {}}
  ];

  return (
    <section className="movie-card">
      <div className="movie-card__bg" style={{backgroundColor: movie.backgroundColor}}>
        {<img src={movie.backgroundImage} alt={movie.name}/>}
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header extraClassName="movie-card__head">
        <Logo isMainPage={true} isLight={false} />
        <UserBlock userData={userData} />
      </Header>

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

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{movie.name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{movie.genre}</span>
              <span className="movie-card__year">{movie.released}</span>
            </p>

            <div className="movie-card__buttons">
              {buttonObjs.map((item, index) => (
                <MovieHeroButton type={item.type} key={`${item.type}-${index}`} clickHandler={item.handler} />
              ))}
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
  movie: PropTypes.shape({
    name: PropTypes.string,
    posterImage: PropTypes.string,
    description: PropTypes.string,
    director: PropTypes.string,
    starring: PropTypes.arrayOf(PropTypes.string),
    rating: PropTypes.number,
    scoresCount: PropTypes.number,
    backgroundImage: PropTypes.string,
    backgroundColor: PropTypes.string,
    released: PropTypes.number,
    genre: PropTypes.oneOf(appGenres),
  }),
  switchPlayer: PropTypes.func.isRequired,
};

export default MovieHero;

