import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import FilmsList from '../films-list/films-list.jsx';
import GenreTabs from '../genre-tabs/genre-tabs.jsx';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import ActionCreator from '../../reducer/application/application';
import UserActionCreator from '../../reducer/user/user';
import withCurrentFilm from '../../hocs/with-current-film/with-current-film';
import {appGenres} from '../../mocks/films';
import {getFilteredFilms} from '../../reducer/data/selectors';
import {getGenre} from '../../reducer/application/selectors';
import {getAuthorizationRequired, getUserData} from '../../reducer/user/selectors';
import {Operation} from '../../reducer/user/user';
import SignIn from '../../components/sign-in/sign-in.jsx';
import withPrivateRoute from '../../hocs/with-private-route/with-private-route';

const FilmsListWithState = withCurrentFilm(FilmsList);
const PrivateRoute = withPrivateRoute(Route);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._renderUserBlock = this._renderUserBlock.bind(this);
    this._signIn = this._signIn.bind(this);
    this._renderMain = this._renderMain.bind(this);
    this._renderFavourites = this._renderFavourites.bind(this);
  }

  render() {
    const {authUserHandler, userData} = this.props;

    return (
      <Switch>
        <Route path="/" exact render={this._renderMain} />
        <Route path="/login" render={({history}) => (
          <SignIn authUserHandler={authUserHandler} history={history} />
        )} />
        <PrivateRoute path="/favourites" userData={userData} render={this._renderFavourites} />
      </Switch>
    );
  }

  _renderUserBlock() {
    const {userData} = this.props;

    if (!userData) {
      return (
        <div className="user-block">
          <a href="sign-in.html" className="user-block__link" onClick={this._signIn}>Sign in</a>
        </div>
      );
    }

    return (
      <div className="user-block__avatar">
        <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
      </div>
    );
  }

  _signIn(evt) {
    evt.preventDefault();

    this.props.changeAuthStatus(true);
  }

  _renderFavourites() {}

  _renderMain() {
    const {genres, genre, movies, filterGenreHandler} = this.props;

    return (
      <React.Fragment>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              {this._renderUserBlock()}
            </div>
          </header>

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
                  <button className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s" />
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add" />
                    </svg>
                    <span>My list</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <GenreTabs genre={genre} clickHandler={filterGenreHandler} genres={genres} />
            <FilmsListWithState movies={movies} />

            <div className="catalog__more">
              <button className="catalog__button" type="button">
                Show more
              </button>
            </div>
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
  })).isRequired,
  genre: PropTypes.oneOf(appGenres).isRequired,
  filterGenreHandler: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  authUserHandler: PropTypes.func.isRequired,
  changeAuthStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    genre: getGenre(state),
    movies: getFilteredFilms(state),
    isAuthorizationRequired: getAuthorizationRequired(state),
    userData: getUserData(state),
  });
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterGenreHandler: (genre) => {
      dispatch(ActionCreator[`GENRE_FILTER`](genre));
    },
    changeAuthStatus: (status) => {
      dispatch(UserActionCreator[`REQUIRED_AUTHORIZATION`](status));
    },
    authUserHandler: (data, callback) => {
      dispatch(Operation.setUserData(data, callback));
    }
  };
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
