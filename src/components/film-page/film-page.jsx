import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../footer/footer.jsx';
import Header from '../header/header.jsx';
import UserBlock from '../user-block/user-block.jsx';
import Logo from '../logo/logo.jsx';
import Catalog from '../catalog/catalog.jsx';
import PageContent from '../page-content/page-content.jsx';
import MovieHeroButton, {MovieHeroButtonType} from '../movie-hero-button/move-hero-button.jsx';
import FilmOverview from '../film-overview/film-overview.jsx';
import FilmDetails from '../film-details/film-details.jsx';
import FilmReviews from '../film-reviews/film-reviews.jsx';
import withLoadComments from '../../hocs/with-load-comments/with-load-comments.js';

const FilmReviewsWithLoading = withLoadComments(FilmReviews);

const SIMILAR_FILMS_AMOUNT = 4;

const FilmPageTab = {
  FILM_OVERVIEW_LABEL: `Overview`,
  FILM_DETAILS_LABEL: `Details`,
  FILM_REVIEWS_LABEL: `Reviews`,
};

const filmPageTabs = Object.keys(FilmPageTab).map((key) => FilmPageTab[key]);
const buttonTypes = Object.keys(MovieHeroButtonType);

const TabContentRenderer = {
  [FilmPageTab.FILM_OVERVIEW_LABEL]: FilmOverview,
  [FilmPageTab.FILM_DETAILS_LABEL]: FilmDetails,
  [FilmPageTab.FILM_REVIEWS_LABEL]: FilmReviewsWithLoading,
};

class FilmPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tab: FilmPageTab.FILM_OVERVIEW_LABEL,
    };
  }

  _setTab(label) {
    this.setState({tab: label});
  }

  _renderTabContent(Component, film, id) {
    return <Component film={film} id={id} />;
  }

  render() {
    const {userData, movies, match} = this.props;
    const {tab} = this.state;

    const film = movies.find((movie) => movie.id === +match.params.id) || {};
    const similarFilms = movies
      .filter((movie) => movie.genre === film.genre && movie.name !== film.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, SIMILAR_FILMS_AMOUNT);

    return (
      <React.Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img
                src={film.backgroundImage}
                alt={film.name}
                style={{backgroundColor: film.backgroundColor}}
              />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <Header extraClassName={`movie-card__head`}>
              <Logo isMainPage={false} isLight={false} />
              <UserBlock userData={userData} />
            </Header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{film.name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{film.genre}</span>
                  <span className="movie-card__year">{film.released}</span>
                </p>

                <div className="movie-card__buttons">
                  {buttonTypes.map((type, index) => (
                    <MovieHeroButton type={type} key={`${type}-${index}`} />
                  ))}

                  <Link to="/" className="btn movie-card__button">
                    Add review
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <nav className="movie-nav movie-card__nav">
                  <ul className="movie-nav__list">
                    {filmPageTabs.map((label, index) => (
                      <li
                        className={`movie-nav__item ${
                          label === tab ? `movie-nav__item--active` : ``
                        }`}
                        key={`label-${index}`}
                        onClick={(evt) => {
                          evt.preventDefault();

                          this._setTab(label);
                        }}
                      >
                        <a href="#" className="movie-nav__link">
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {this._renderTabContent(TabContentRenderer[this.state.tab], film, +match.params.id)}
              </div>
            </div>
          </div>
        </section>

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
  userData: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
  }),
  movies: PropTypes.arrayOf(
      PropTypes.shape({
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
      })
  ).isRequired,
  match: PropTypes.object.isRequired,
};

export default FilmPage;
