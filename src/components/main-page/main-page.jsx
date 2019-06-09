import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../footer/footer.jsx';
import Catalog from '../catalog/catalog.jsx';
import PageContent from '../page-content/page-content.jsx';
import MovieHero from '../movie-hero/movie-hero.jsx';
import PlayerMain from '../player-main/player-main.jsx';

import withFilters from '../../hocs/with-filters/with-filters';
import withLoading from '../../hocs/with-loading/with-loading';
import withPlayerControls from '../../hocs/with-player-controls/with-player-controls';

import PropType from '../../proptypes.js';

const CatalogInteractive = withFilters(Catalog);
const Player = withPlayerControls(withLoading(PlayerMain));

const MainPage = (props) => {
  const {
    isPlayerActive,
    movies,
    genres,
    switchPlayer,
    userData,
    promoFilm,
    setToFavoritesHandler,
    favorites,
    history,
  } = props;

  const renderTitle = () => <h2 className="catalog__title visually-hidden">Catalog</h2>;

  if (!isPlayerActive) {
    return (
      <React.Fragment>
        <MovieHero
          userData={userData}
          movie={promoFilm}
          switchPlayer={switchPlayer}
          setToFavoritesHandler={() => {
            setToFavoritesHandler(promoFilm.id, 1, () => history.push(`/login`));
          }}
          isInList={favorites.some((film) => film.id === promoFilm.id)}
        />

        <PageContent>
          <CatalogInteractive
            renderTitle={renderTitle}
            movies={movies}
            genres={genres}
          />

          <Footer isMainPage={true} />
        </PageContent>
      </React.Fragment>
    );
  }

  return <Player movie={promoFilm} switchPlayer={switchPlayer} />;
};

MainPage.propTypes = {
  movies: PropTypes.arrayOf(PropType.movie).isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  userData: PropType.userData,
  isPlayerActive: PropTypes.bool.isRequired,
  switchPlayer: PropTypes.func.isRequired,
  promoFilm: PropType.movie,
  favorites: PropTypes.arrayOf(PropType.movie).isRequired,
  setToFavoritesHandler: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default MainPage;
