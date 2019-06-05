import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Footer from '../footer/footer.jsx';
import Header from '../header/header.jsx';
import UserBlock from '../user-block/user-block.jsx';
import Logo from '../logo/logo.jsx';

const FilmPageTab = {
  FILM_OVERVIEW_LABEL: `Overview`,
  FILM_DETAILS_LABEL: `Details`,
  FILM_REVIEWS_LABEL: `Reviews`,
};

const filmPageTabs = Object.keys(FilmPageTab).map((key) => FilmPageTab[key]);

class FilmPage extends PureComponent {
  constructor(props) {
    super(props);
    const {match} = props;

    this.id = +match.params.id;
    this._setFilm();
    this._setSimilarFilms();

    this.state = {
      tab: FilmPageTab.FILM_OVERVIEW_LABEL,
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.movies.length && this.props.movies.length) {
      this._setFilm();
      this._setSimilarFilms();
    }
  }

  _setFilm() {
    this.film = this.props.movies.find((movie) => movie.id === this.id) || {};
  }

  _setSimilarFilms() {
    this.similarFilms = this.props.movies
      .filter((movie) => movie.genre === this.film.genre && movie.name !== this.film.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  }

  render() {
    const {userData} = this.props;
    const {tab} = this.state;
    const {film} = this;

    console.log('film', film)

    return (
      <React.Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={film.backgroundImage} alt={film.name} style={{backgroundColor: film.backgroundColor}} />
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
                  <button className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                  <a href="add-review.html" className="btn movie-card__button">Add review</a>
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
                      <li className={`movie-nav__item ${label === tab ? `movie-nav__item--active` : ``}`} key={`label-${index}`}>
                        <a href="#" className="movie-nav__link">{label}</a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="movie-rating">
                  <div className="movie-rating__score">{film.rating}</div>
                  <p className="movie-rating__meta">
                    <span className="movie-rating__level">Very good</span>
                    <span className="movie-rating__count">{film.scoresCount} ratings</span>
                  </p>
                </div>

                <div className="movie-card__text">
                  <p>{film.description}</p>

                  <p className="movie-card__director"><strong>Director: {film.director}</strong></p>

                  <p className="movie-card__starring"><strong>Starring: {film.starring && film.starring.join(`, `)} and other</strong></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <div className="catalog__movies-list">
              <article className="small-movie-card catalog__movies-card">
                <button className="small-movie-card__play-btn" type="button">Play</button>
                <div className="small-movie-card__image">
                  <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Fantastic Beasts: The Crimes of Grindelwald</a>
                </h3>
              </article>

              <article className="small-movie-card catalog__movies-card">
                <button className="small-movie-card__play-btn" type="button">Play</button>
                <div className="small-movie-card__image">
                  <img src="img/bohemian-rhapsody.jpg" alt="Bohemian Rhapsody" width="280" height="175" />
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Bohemian Rhapsody</a>
                </h3>
              </article>

              <article className="small-movie-card catalog__movies-card">
                <button className="small-movie-card__play-btn" type="button">Play</button>
                <div className="small-movie-card__image">
                  <img src="img/macbeth.jpg" alt="Macbeth" width="280" height="175" />
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Macbeth</a>
                </h3>
              </article>

              <article className="small-movie-card catalog__movies-card">
                <button className="small-movie-card__play-btn" type="button">Play</button>
                <div className="small-movie-card__image">
                  <img src="img/aviator.jpg" alt="Aviator" width="280" height="175" />
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Aviator</a>
                </h3>
              </article>
            </div>
          </section>

          <Footer isMainPage={false} />
        </div>
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
  })).isRequired,
  match: PropTypes.object.isRequired,
};

export default FilmPage;
