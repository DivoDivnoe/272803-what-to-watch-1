import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Footer from '../footer/footer.jsx';
import Catalog from '../catalog/catalog.jsx';
import withFilters from '../../hocs/with-filters/with-filters';
import PageContent from '../page-content/page-content.jsx';
import MovieHero from '../movie-hero/movie-hero.jsx';
import {appGenres} from '../../reducer/data/data';
import withLoading from '../../hocs/with-loading/with-loading';
import withPlayerControls from '../../hocs/with-player-controls/with-player-controls';
import PlayerMain from '../player-main/player-main.jsx';

const CatalogInteractive = withFilters(Catalog);
const Player = withPlayerControls(withLoading(PlayerMain));

class MainPage extends PureComponent {
  render() {
    const {isPlayerActive, movies, genres, movie, switchPlayer, userData} = this.props;

    if (!isPlayerActive) {
      return (
        <React.Fragment>
          <MovieHero
            userData={userData}
            movie={movie}
            switchPlayer={switchPlayer}
          />

          <PageContent>
            <CatalogInteractive
              renderTitle={() => (
                <h2 className="catalog__title visually-hidden">Catalog</h2>
              )}
              movies={movies}
              genres={genres}
            />

            <Footer isMainPage={true} />
          </PageContent>
        </React.Fragment>
      );
    }

    return <Player movie={movie} switchPlayer={switchPlayer} />;
  }
}

MainPage.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    rating: PropTypes.number.isRequired,
    scoresCount: PropTypes.number.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    genre: PropTypes.oneOf(appGenres).isRequired,
  })).isRequired,
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
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  userData: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
  }),
  isPlayerActive: PropTypes.bool.isRequired,
  switchPlayer: PropTypes.func.isRequired,
};

export default MainPage;
