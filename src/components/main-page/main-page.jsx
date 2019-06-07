import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import Catalog from '../catalog/catalog.jsx';
import Logo from '../logo/logo.jsx';
import UserBlock from '../user-block/user-block.jsx';
import withFilters from '../../hocs/with-filters/with-filters';
import PageContent from '../page-content/page-content.jsx';
import MovieHeroButton from '../movie-hero-button/move-hero-button.jsx';
import MovieHero from '../movie-hero/movie-hero.jsx';
import withLoading from '../../hocs/with-loading/with-loading';
import withPlaying from '../../hocs/with-playing/with-playing';
import {appGenres} from '../../reducer/data/data';

const MovieHeroWithLoading = withPlaying(withLoading(MovieHero));
const CatalogInteractive = withFilters(Catalog);

class MainPage extends PureComponent {
  render() {
    const {
      genres,
      movies,
      userData,
    } = this.props;

    const renderMovieHero = () => {
      if (movies.length) {
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];

        console.log('data', userData)

        return (
          <MovieHeroWithLoading
            userData={userData}
            movie={randomMovie}
            isFull={true}
          />
        );
      }

      return null;
    };

    return (
      <React.Fragment>
        {renderMovieHero()}

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
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  userData: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default MainPage;
