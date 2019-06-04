import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import FilmsList from '../films-list/films-list.jsx';
import withCurrentFilm from '../../hocs/with-current-film/with-current-film';
import {appGenres} from '../../mocks/films';

const FilmsListWithState = withCurrentFilm(FilmsList);

class Favorites extends PureComponent {
  componentDidMount() {
    this.props.loadFavoritesHandler();
  }

  render() {
    const {userData, movies} = this.props;

    return (
      <div className="user-page">
        <Header userData={userData} isMainPage={false} additionalClassName={`user-page__head`} />

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <FilmsListWithState movies={movies} />
        </section>

        <Footer isMainPage={false} />
      </div>
    );
  }
}

Favorites.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    genre: PropTypes.oneOf(appGenres).isRequired,
  })).isRequired,
  userData: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
  }),
  loadFavoritesHandler: PropTypes.func.isRequired,
};

export default Favorites;
