import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Footer from '../footer/footer.jsx';
import Catalog from '../catalog/catalog.jsx';
import PageContent from '../page-content/page-content.jsx';
import MovieHeroFilm from '../movie-hero-film/movie-hero-film.jsx';
import PlayerMain from '../player-main/player-main.jsx';
import withTabsSwitch from '../../hocs/with-tab-switch/with-tab-switch';
import withLoading from '../../hocs/with-loading/with-loading';
import withPlayerControls from '../../hocs/with-player-controls/with-player-controls';
import PropType from '../../proptypes.js';

const MovieHeroWithTabs = withTabsSwitch(MovieHeroFilm);
const Player = withPlayerControls(withLoading(PlayerMain));

const SIMILAR_FILMS_AMOUNT = 4;

class FilmPage extends PureComponent {
  render() {
    const {
      userData,
      movies,
      match,
      switchPlayer,
      isPlayerActive,
      setToFavoritesHandler,
      favorites,
      history,
    } = this.props;

    const film = movies.find((movie) => movie.id === +match.params.id) || {};
    const similarFilms = movies
      .filter((movie) => movie.genre === film.genre && movie.name !== film.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, SIMILAR_FILMS_AMOUNT);

    if (!isPlayerActive) {
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

    return <Player movie={film} switchPlayer={switchPlayer} />;
  }
}

FilmPage.propTypes = {
  userData: PropType.userData,
  movies: PropTypes.arrayOf(PropType.movie).isRequired,
  favorites: PropTypes.arrayOf(PropType.movie).isRequired,
  match: PropTypes.object.isRequired,
  switchPlayer: PropTypes.func.isRequired,
  isPlayerActive: PropTypes.bool.isRequired,
  setToFavoritesHandler: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default FilmPage;
