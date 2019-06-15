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
    userData,
    film,
    favorites,
    history,
    onSetToFavorites,
    onSwitchPlayer,
  } = props;

  const isInList = favorites.some((movie) => movie.id === film.id);

  return (
    <React.Fragment>
      <MovieHero
        userData={userData}
        movie={film}
        isInList={isInList}
        onSwitchPlayer={onSwitchPlayer}
        onSetToFavorites={() => {
          onSetToFavorites(film.id, +!isInList, () => history.push(`/login`));
        }}
      />

      <PageContent>
        <CatalogInteractive
          movies={movies}
          genres={genres}
          renderTitle={() => <h2 className="catalog__title visually-hidden">Catalog</h2>}
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
  film: PropType.movie,
  favorites: PropTypes.arrayOf(PropType.movie).isRequired,
  history: PropTypes.object.isRequired,
  onSetToFavorites: PropTypes.func.isRequired,
  onSwitchPlayer: PropTypes.func.isRequired,
};

export default MainPage;
