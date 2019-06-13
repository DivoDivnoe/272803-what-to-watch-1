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
    this._handleFail = this._handleFail.bind(this);
  }
  render() {
    const {
      userData,
      favorites,
      film,
      similarFilms,
      comments,
      onSwitchPlayer,
      onLoadComments,
      onDeleteComments,
    } = this.props;

    return (
      <React.Fragment>
        <MovieHeroWithTabs
          id={film.id}
          movie={film}
          userData={userData}
          comments={comments}
          isInList={favorites.some((movie) => movie.id === film.id)}
          onSwitchPlayer={onSwitchPlayer}
          onLoadComments={onLoadComments}
          onDeleteComments={onDeleteComments}
          onSetToFavorites={this._handleSetToFavorites}
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
    const {onSetToFavorites, film, favorites} = this.props;
    const status = +!favorites.some((movie) => movie.id === film.id);

    onSetToFavorites(film.id, status, this._handleFail);
  }

  _handleFail() {
    const {history, film} = this.props;

    history.push(`/login?redirect=/film/${film.id}`);
  }
}

FilmPage.propTypes = {
  userData: PropType.userData,
  favorites: PropTypes.arrayOf(PropType.movie).isRequired,
  film: PropType.movie,
  similarFilms: PropTypes.arrayOf(PropType.movie).isRequired,
  comments: PropTypes.arrayOf(PropType.review),
  history: PropTypes.object.isRequired,
  onSetToFavorites: PropTypes.func.isRequired,
  onSwitchPlayer: PropTypes.func.isRequired,
  onLoadComments: PropTypes.func.isRequired,
  onDeleteComments: PropTypes.func.isRequired,
};

export default FilmPage;
