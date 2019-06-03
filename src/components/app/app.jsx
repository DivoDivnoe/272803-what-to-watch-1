import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import FilmsList from '../films-list/films-list.jsx';
import GenreTabs from '../genre-tabs/genre-tabs.jsx';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import ActionCreator from '../../reducer/application/application';
import UserActionCreator from '../../reducer/user/user';
import withCurrentFilm from '../../hocs/with-current-film/with-current-film';
import {appGenres} from '../../mocks/films';
import {getFilteredFilms} from '../../reducer/data/selectors';
import {getGenre} from '../../reducer/application/selectors';
import {getAuthorizationRequired, getUserData} from '../../reducer/user/selectors';
import {Operation} from '../../reducer/user/user';
import SignIn from '../sign-in/sign-in.jsx';
import Favorites from '../favorites/favorites.jsx';
import withPrivateRoute from '../../hocs/with-private-route/with-private-route';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

const FilmsListWithState = withCurrentFilm(FilmsList);
const PrivateRoute = withPrivateRoute(Route);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._renderMain = this._renderMain.bind(this);
  }

  render() {
    const {authUserHandler, userData} = this.props;

    return (
      <Switch>
        <Route path="/" exact render={this._renderMain} />
        <Route path="/login" render={({history}) => (
          <SignIn authUserHandler={authUserHandler} history={history} />
        )} />
        <PrivateRoute path="/favorites" userData={userData} component={Favorites} />
      </Switch>
    );
  }

  _renderMain() {
    const {genres, genre, movies, filterGenreHandler, userData} = this.props;

    return (
      <React.Fragment>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header userData={userData} isMainPage={true} />

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

          <Footer isMainPage={true} />
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
