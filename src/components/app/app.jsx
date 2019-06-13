import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';

import MainPage from '../main-page/main-page.jsx';
import FilmPage from '../film-page/film-page.jsx';
import SignInPage from '../sign-in-page/sign-in-page.jsx';
import Favorites from '../favorites/favorites.jsx';
import AddReviewPage from '../add-review-page/add-review-page.jsx';
import PageNotExistMessage from '../page-not-exist-message/page-not-exist-message.jsx';

import withPrivateRoute from '../../hocs/with-private-route/with-private-route';
import withPublicRedirect from '../../hocs/with-public-redirect/with-public-redirect';
import withPlayerActive from '../../hocs/with-player-active/with-player-active';
import withSignInData from '../../hocs/with-sign-in-data/with-sign-in-data';
import withCurrentMovie from '../../hocs/with-current-movie/with-current-movie';
import withReviewData from '../../hocs/with-review-data/with-review-data';

import DataActionCreator, {Operation as DataOperation} from '../../reducer/data/data';
import {getFilms, getFavorites, getGenres, getPromoFilm, getComments} from '../../reducer/data/selectors';
import {getUserData} from '../../reducer/user/selectors';
import {getServerStatus} from '../../reducer/application/selectors';
import {ActionCreator as AppActionCreator} from '../../reducer/application/application';
import {Operation as UserOperation} from '../../reducer/user/user';

import PropType from '../../proptypes';

const PrivateRoute = withPrivateRoute(Route);
const RoutePublicRedirect = withPublicRedirect(Route);

const MainPageWithPlayerSwitch = withPlayerActive(MainPage);
const FilmPageWithStateAndPlayerSwitch = withCurrentMovie(withPlayerActive(FilmPage));
const SignInPageWithState = withSignInData(SignInPage);
const AddReviewPageWithState = withCurrentMovie(withReviewData(AddReviewPage));

class App extends PureComponent {
  render() {
    const {
      authUserHandler,
      userData,
      favorites,
      genres,
      movies,
      promoFilm,
      setToFavoritesHandler,
      isServerResponding,
      comments,
      loadComments,
      deleteComments,
    } = this.props;

    const isAuthenticated = !!Object.keys(userData).length;

    if (!isServerResponding) {
      return <h1>Server is not responding</h1>;
    }

    return (
      <Switch>
        <Route path="/" exact render={({history}) => (
          <MainPageWithPlayerSwitch
            genres={genres}
            movies={movies}
            userData={userData}
            film={promoFilm}
            setToFavoritesHandler={setToFavoritesHandler}
            favorites={favorites}
            history={history}
          />
        )} />
        <PrivateRoute
          path="/film/:id/review"
          isAuthenticated={isAuthenticated}
          render={({match, history}) => (
            <AddReviewPageWithState
              movies={movies}
              userData={userData}
              match={match}
              history={history}
            />
          )}
        />
        <Route path="/film/:id" render={({match, history}) => (
          <FilmPageWithStateAndPlayerSwitch
            userData={userData}
            match={match}
            movies={movies}
            setToFavoritesHandler={setToFavoritesHandler}
            favorites={favorites}
            history={history}
            comments={comments}
            loadComments={loadComments}
            deleteComments={deleteComments}
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
          )}
        />
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

        <Route
          path="/"
          component={PageNotExistMessage}
        />
      </Switch>
    );
  }

  componentDidUpdate(prevProps) {
    const {userData, loadFavorites} = this.props;

    if (!Object.keys(prevProps.userData).length && Object.keys(userData).length) {
      loadFavorites();
    }
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
  comments: PropTypes.arrayOf(PropType.review),
  userData: PropType.userData,
  authUserHandler: PropTypes.func.isRequired,
  setToFavoritesHandler: PropTypes.func.isRequired,
  loadFavorites: PropTypes.func.isRequired,
  setServerStatus: PropTypes.func.isRequired,
  isServerResponding: PropTypes.bool.isRequired,
  loadComments: PropTypes.func.isRequired,
  deleteComments: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    movies: getFilms(state),
    userData: getUserData(state),
    favorites: getFavorites(state),
    genres: getGenres(state),
    promoFilm: getPromoFilm(state),
    isServerResponding: getServerStatus(state),
    comments: getComments(state),
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
    setGenresList: (genres) => {
      dispatch(DataActionCreator[`SET_GENRES`](genres));
    },
    setServerStatus: (status) => {
      dispatch(AppActionCreator[`SET_SERVER_STATUS`](status));
    },
    loadComments: (id) => {
      dispatch(DataOperation.loadComments(id));
    },
    deleteComments: () => {
      dispatch(DataActionCreator[`LOAD_COMMENTS`]([]));
    }
  };
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
