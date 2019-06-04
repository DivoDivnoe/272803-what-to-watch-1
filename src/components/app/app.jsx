import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import AppActionCreator from '../../reducer/application/application';
import UserActionCreator from '../../reducer/user/user';
import {appGenres} from '../../reducer/data/data';
import {getFilteredFilms, getFavorites, getGenres} from '../../reducer/data/selectors';
import {getGenre} from '../../reducer/application/selectors';
import {getAuthorizationRequired, getUserData} from '../../reducer/user/selectors';
import {Operation as UserOperation} from '../../reducer/user/user';
import DataActionCreator, {Operation as dataOperation} from '../../reducer/data/data';
import SignInPage from '../sign-in-page/sign-in-page.jsx';
import Favorites from '../favorites/favorites.jsx';
import withPrivateRoute from '../../hocs/with-private-route/with-private-route';
import withPublicRedirect from '../../hocs/with-public-redirect/with-public-redirect';
import MainPage from '../main-page/main-page.jsx';

const PrivateRoute = withPrivateRoute(Route);
const RoutePublicRedirect = withPublicRedirect(Route);

class App extends PureComponent {
  componentDidMount() {
    this.props.checkIsAuthUser();
  }

  render() {
    const {
      authUserHandler,
      userData,
      loadFavoritesHandler,
      favorites,
      checkIsAuthUser,
      genres,
      genre,
      movies,
      filterGenreHandler
    } = this.props;

    const isAuthenticated = !!Object.keys(userData).length;

    return (
      <Switch>
        <Route path="/" exact render={() => (
          <MainPage
            genres={genres}
            genre={genre}
            movies={movies}
            filterGenreHandler={filterGenreHandler}
            userData={userData}
          />
        )} />
        <RoutePublicRedirect
          path="/login"
          isAuthenticated={isAuthenticated}
          render={({history}) => (
            <SignInPage
              authUserHandler={authUserHandler}
              history={history}
              userData={userData}
            />
          )} />
        <PrivateRoute
          path="/favorites"
          checkIsAuthUser={checkIsAuthUser}
          isAuthenticated={isAuthenticated}
          render={() => (
            <Favorites
              loadFavoritesHandler={loadFavoritesHandler}
              movies={favorites}
              userData={userData}
            />
          )}
        />
      </Switch>
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
    id: PropTypes.number,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
  }),
  authUserHandler: PropTypes.func.isRequired,
  changeAuthStatus: PropTypes.func.isRequired,
  loadFavoritesHandler: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
  })).isRequired,
  checkIsAuthUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    genre: getGenre(state),
    movies: getFilteredFilms(state),
    isAuthorizationRequired: getAuthorizationRequired(state),
    userData: getUserData(state),
    favorites: getFavorites(state),
    genres: getGenres(state),
  });
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterGenreHandler: (genre) => {
      dispatch(AppActionCreator[`GENRE_FILTER`](genre));
    },
    changeAuthStatus: (status) => {
      dispatch(UserActionCreator[`REQUIRED_AUTHORIZATION`](status));
    },
    authUserHandler: (data, callback) => {
      dispatch(UserOperation.setUserData(data, callback));
    },
    loadFavoritesHandler: () => {
      dispatch(dataOperation.loadFavorites());
    },
    checkIsAuthUser: () => {
      dispatch(UserOperation.checkIsAuthUser());
    },
    setGenresList: (genres) => {
      dispatch(DataActionCreator[`SET_GENRES`](genres));
    }
  };
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
