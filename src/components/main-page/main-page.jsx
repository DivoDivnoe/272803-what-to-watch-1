import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../footer/footer.jsx';
import Catalog from '../catalog/catalog.jsx';
import PageContent from '../page-content/page-content.jsx';
import MovieHero from '../movie-hero/movie-hero.jsx';
import withFilters from '../../hocs/with-filters/with-filters';
import PropType from '../../proptypes.js';

const CatalogInteractive = withFilters(Catalog);

const MainPage = (props) => {
  const {
    movies,
    genres,
    switchPlayer,
    userData,
    film,
    setToFavoritesHandler,
    favorites,
    history,
  } = props;

  const renderTitle = () => <h2 className="catalog__title visually-hidden">Catalog</h2>;

  return (
    <React.Fragment>
      <MovieHero
        userData={userData}
        movie={film}
        switchPlayer={switchPlayer}
        setToFavoritesHandler={() => {
          setToFavoritesHandler(film.id, 1, () => history.push(`/login`));
        }}
        isInList={favorites.some((movie) => movie.id === film.id)}
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
};

MainPage.propTypes = {
  movies: PropTypes.arrayOf(PropType.movie).isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  userData: PropType.userData,
  switchPlayer: PropTypes.func.isRequired,
  film: PropType.movie,
  favorites: PropTypes.arrayOf(PropType.movie).isRequired,
  setToFavoritesHandler: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default MainPage;
