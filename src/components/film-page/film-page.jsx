import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Footer from '../footer/footer.jsx';
import Catalog from '../catalog/catalog.jsx';
import PageContent from '../page-content/page-content.jsx';
import MovieHeroFilm from '../movie-hero-film/movie-hero-film.jsx';
import withTabsSwitch from '../../hocs/with-tab-switch/with-tab-switch';
import PropType from '../../proptypes.js';

const MovieHeroWithTabs = withTabsSwitch(MovieHeroFilm);

class FilmPage extends PureComponent {
  render() {
    const {
      userData,
      match,
      switchPlayer,
      setToFavoritesHandler,
      favorites,
      history,
      film,
      similarFilms,
    } = this.props;

    return (
      <React.Fragment>
        <MovieHeroWithTabs
          movie={film}
          userData={userData}
          switchPlayer={switchPlayer}
          id={+match.params.id}
          setToFavoritesHandler={() => {
            setToFavoritesHandler(+match.params.id, 1, () => history.push(`/login?redirect=/film/${+match.params.id}`));
          }}
          isInList={favorites.some((movie) => movie.id === +match.params.id)}
        />

        <PageContent>
          <Catalog
            movies={similarFilms}
            extraClassName={`catalog--like-this`}
            renderTitle={() => <h2 className="catalog__title">More like this</h2>}
            renderTabs={() => {}}
            renderButton={() => {}}
          />

          <Footer isMainPage={false} />
        </PageContent>
      </React.Fragment>
    );
  }
}

FilmPage.propTypes = {
  userData: PropType.userData,
  favorites: PropTypes.arrayOf(PropType.movie).isRequired,
  match: PropTypes.object.isRequired,
  switchPlayer: PropTypes.func.isRequired,
  setToFavoritesHandler: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  film: PropType.movie,
  similarFilms: PropTypes.arrayOf(PropType.movie).isRequired,
};

export default FilmPage;
