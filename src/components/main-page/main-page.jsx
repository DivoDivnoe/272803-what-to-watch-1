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

const CatalogInteractive = withFilters(Catalog);

class MainPage extends PureComponent {
  render() {
    const {
      genres,
      movies,
      userData,
    } = this.props;

    return (
      <React.Fragment>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header extraClassName="movie-card__head">
            <Logo isMainPage={true} isLight={false} />
            <UserBlock userData={userData} />
          </Header>

          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img
                  src="img/the-grand-budapest-hotel-poster.jpg"
                  alt="The Grand Budapest Hotel poster"
                  width="218"
                  height="327"
                />
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">The Grand Budapest Hotel</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">Drama</span>
                  <span className="movie-card__year">2014</span>
                </p>

                <div className="movie-card__buttons">
                  {[`play`, `list`].map((type, index) => <MovieHeroButton type={type} key={`${type}-${index}`} />)}
                </div>
              </div>
            </div>
          </div>
        </section>

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
