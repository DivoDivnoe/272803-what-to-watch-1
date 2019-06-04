import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import Catalog from '../catalog/catalog.jsx';
import Logo from '../logo/logo.jsx';
import UserBlock from '../user-block/user-block.jsx';
import GenreTabs from '../genre-tabs/genre-tabs.jsx';
import {appGenres} from '../../reducer/data/data.js';
import withShownFilms from '../../hocs/with-shown-films/with-shown-films';

const CatalogWithButton = withShownFilms(Catalog);

const MainPage = (props) => {
  const {genres, genre, movies, filterGenreHandler, userData} = props;

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
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
                src="img/the-grand-budapest-hotel-poster.jpg"
                alt="The Grand Budapest Hotel poster"
                width="218"
                height="327"
              />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">The Grand Budapest Hotel</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">Drama</span>
                <span className="movie-card__year">2014</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <CatalogWithButton
          movies={movies}
          renderTabs={() => (
            <GenreTabs genre={genre} clickHandler={filterGenreHandler} genres={genres} />
          )}
        />

        <Footer isMainPage={true} />
      </div>
    </React.Fragment>
  );
};

MainPage.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
  })).isRequired,
  genre: PropTypes.oneOf(appGenres).isRequired,
  filterGenreHandler: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  userData: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default MainPage;
