import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import Catalog from '../catalog/catalog.jsx';
import Logo from '../logo/logo.jsx';
import UserBlock from '../user-block/user-block.jsx';
import PropType from '../../proptypes.js';

const Favorites = (props) => {
  const {userData, favorites} = props;

  return (
    <div className="user-page">
      <Header extraClassName={`user-page__head`}>
        <Logo isMainPage={false} isLight={false} />

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock userData={userData} isLinkRequired={false} />
      </Header>

      <Catalog
        movies={favorites}
        renderTitle={() => <h2 className="catalog__title visually-hidden">Catalog</h2>}
      />

      <Footer isMainPage={false} />
    </div>
  );
};

Favorites.propTypes = {
  userData: PropType.userData.isRequired,
  favorites: PropTypes.arrayOf(PropType.movie).isRequired,
};

export default Favorites;
