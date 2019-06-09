import React from 'react';
import PropTypes from 'prop-types';
import MovieHeroDesc from '../movie-hero-desc/movie-hero-desc.jsx';
import MovieHeroHead from '../movie-hero-head/movie-hero-head.jsx';
import FilmOverview from '../film-overview/film-overview.jsx';
import FilmDetails from '../film-details/film-details.jsx';
import FilmReviews from '../film-reviews/film-reviews.jsx';
import {FilmPageTab} from '../../hocs/with-tab-switch/with-tab-switch';
import withLoadComments from '../../hocs/with-load-comments/with-load-comments.js';
import PropType from '../../proptypes.js';

const FilmReviewsWithLoading = withLoadComments(FilmReviews);

const TabContentRenderer = {
  [FilmPageTab.FILM_OVERVIEW_LABEL]: FilmOverview,
  [FilmPageTab.FILM_DETAILS_LABEL]: FilmDetails,
  [FilmPageTab.FILM_REVIEWS_LABEL]: FilmReviewsWithLoading,
};

const renderTabContent = (Component, film, id) => {
  return <Component film={film} id={id} />;
};

const MovieHeroFilm = (props) => {
  const {
    userData,
    movie,
    switchPlayer,
    renderTabs,
    tab,
    id,
    setToFavoritesHandler,
    isInList,
  } = props;

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <MovieHeroHead movie={movie} userData={userData} isMainPage={false} />

        <div className="movie-card__wrap">
          <MovieHeroDesc
            reviewsLinkRequired={true}
            movie={movie}
            switchPlayer={switchPlayer}
            setToFavoritesHandler={setToFavoritesHandler}
            isInList={isInList}
          />
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={movie.posterImage} alt={`${movie.name} poster`} width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <nav className="movie-nav movie-card__nav">
              {renderTabs()}
            </nav>

            {renderTabContent(TabContentRenderer[tab], movie, id)}
          </div>
        </div>
      </div>
    </section>
  );
};

MovieHeroFilm.propTypes = {
  userData: PropType.userData,
  movie: PropType.movie,
  switchPlayer: PropTypes.func.isRequired,
  renderTabs: PropTypes.func.isRequired,
  tab: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setToFavoritesHandler: PropTypes.func.isRequired,
  isInList: PropTypes.bool.isRequired,
};

export default MovieHeroFilm;
