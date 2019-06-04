import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import {appGenres} from '../../reducer/data/data.js';
import Catalog from '../catalog/catalog.jsx';
import Logo from '../logo/logo.jsx';
import UserBlock from '../user-block/user-block.jsx';


class Favorites extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadFavoritesHandler();
  }

  render() {
    const {userData, movies} = this.props;

    return (
      <div className="user-page">
        <Header extraClassName={`user-page__head`}>
          <Logo isMainPage={false} isLight={false} />

          <h1 className="page-title user-page__title">My list</h1>

          <UserBlock userData={userData} />
        </Header>

        <Catalog
          movies={movies}
          renderTabs={() => {}}
          renderButton={() => {}}
        />

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
