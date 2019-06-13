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
  constructor(props) {
    super(props);

    this._handleSetToFavorites = this._handleSetToFavorites.bind(this);
    this._onFail = this._onFail.bind(this);
  }
  render() {
    const {
      userData,
      switchPlayer,
      favorites,
      film,
      similarFilms,
      comments,
      loadComments,
      deleteComments,
    } = this.props;

    return (
      <React.Fragment>
        <MovieHeroWithTabs
          movie={film}
          userData={userData}
          switchPlayer={switchPlayer}
          comments={comments}
          loadComments={loadComments}
          deleteComments={deleteComments}
          id={film.id}
          setToFavoritesHandler={this._handleSetToFavorites}
          isInList={favorites.some((movie) => movie.id === film.id)}
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

  _handleSetToFavorites() {
    const {setToFavoritesHandler, film, favorites} = this.props;
    const status = +!favorites.some((movie) => movie.id === film.id);

    setToFavoritesHandler(film.id, status, this._onFail);
  }

  _onFail() {
    const {history, film} = this.props;

    history.push(`/login?redirect=/film/${film.id}`);
  }
}

FilmPage.propTypes = {
  userData: PropType.userData,
  favorites: PropTypes.arrayOf(PropType.movie).isRequired,
  switchPlayer: PropTypes.func.isRequired,
  setToFavoritesHandler: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  film: PropType.movie,
  similarFilms: PropTypes.arrayOf(PropType.movie).isRequired,
  comments: PropTypes.arrayOf(PropType.review),
  loadComments: PropTypes.func.isRequired,
  deleteComments: PropTypes.func.isRequired,
};

export default FilmPage;
