import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';

import MainPage from '../main-page/main-page.jsx';
import FilmPage from '../film-page/film-page.jsx';
import SignInPage from '../sign-in-page/sign-in-page.jsx';
import Favorites from '../favorites/favorites.jsx';

import withPrivateRoute from '../../hocs/with-private-route/with-private-route';
import withPublicRedirect from '../../hocs/with-public-redirect/with-public-redirect';
import withPlayerActive from '../../hocs/with-player-active/with-player-active';
import withSignInData from '../../hocs/with-sign-in-data/with-sign-in-data.js';

import DataActionCreator, {Operation as DataOperation} from '../../reducer/data/data';
import {getFilms, getFavorites, getGenres, getPromoFilm} from '../../reducer/data/selectors';
import {getUserData} from '../../reducer/user/selectors';
import {Operation as UserOperation} from '../../reducer/user/user';

import PropType from '../../proptypes.js';

const PrivateRoute = withPrivateRoute(Route);
const RoutePublicRedirect = withPublicRedirect(Route);

const MainPageWithPlayerSwitch = withPlayerActive(MainPage);
const FilmPageWithPlayerSwitch = withPlayerActive(FilmPage);
const SignInPageWithState = withSignInData(SignInPage);

class App extends PureComponent {
  componentDidMount() {
    this.props.checkIsAuthUser();
  }

  componentDidUpdate(prevProps) {
    const {userData, loadFavorites} = this.props;

    if (!Object.keys(prevProps.userData).length && Object.keys(userData).length) {
      loadFavorites();
    }
  }

  render() {
    const {
      authUserHandler,
      userData,
      favorites,
      genres,
      movies,
      promoFilm,
      setToFavoritesHandler,
    } = this.props;

    const isAuthenticated = !!Object.keys(userData).length;

    return (
      <Switch>
        <Route path="/" exact render={({history}) => (
          <MainPageWithPlayerSwitch
            genres={genres}
            movies={movies}
            userData={userData}
            promoFilm={promoFilm}
            setToFavoritesHandler={setToFavoritesHandler}
            favorites={favorites}
            history={history}
          />
        )} />
        <Route path="/film/:id" render={({match, history}) => (
          <FilmPageWithPlayerSwitch
            userData={userData}
            match={match}
            movies={movies}
            setToFavoritesHandler={setToFavoritesHandler}
            favorites={favorites}
            history={history}
          />
        )} />
        <RoutePublicRedirect
          path="/login"
          isAuthenticated={isAuthenticated}
          render={({history}) => (
            <SignInPageWithState
              authUserHandler={authUserHandler}
              history={history}
              userData={userData}
            />
          )} />
        <PrivateRoute
          path="/favorites"
          isAuthenticated={isAuthenticated}
          render={() => (
            <Favorites
              favorites={favorites}
              userData={userData}
            />
          )}
        />
      </Switch>
    );
  }
}

App.propTypes = {
  movies: PropTypes.arrayOf(PropType.movie).isRequired,
  promoFilm: PropType.movie,
  favorites: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
  })).isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  userData: PropType.userData,
  authUserHandler: PropTypes.func.isRequired,
  checkIsAuthUser: PropTypes.func.isRequired,
  setToFavoritesHandler: PropTypes.func.isRequired,
  loadFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    movies: getFilms(state),
    userData: getUserData(state),
    favorites: getFavorites(state),
    genres: getGenres(state),
    promoFilm: getPromoFilm(state),
  });
};

const mapDispatchToProps = (dispatch) => {
  return {
    authUserHandler: (data, onSuccess, onFail) => {
      dispatch(UserOperation.setUserData(data, onSuccess, onFail));
    },
    loadFavorites: () => {
      dispatch(DataOperation.loadFavorites());
    },
    setToFavoritesHandler: (id, status, onFail) => {
      dispatch(DataOperation.setToFavorites(id, status, onFail));
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
