import React from 'react';
import PropTypes from 'prop-types';

export const MovieHeroButtonType = {
  play: {
    title: `Play`,
    renderIcon() {
      return (
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
      );
    },
  },
  list: {
    title: `My list`,
    renderIcon() {
      return (
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
      );
    },
  },
};

const MovieHeroButton = (props) => {
  const {type} = props;
  const {title, renderIcon} = MovieHeroButtonType[type];

  const className = `btn btn--${type} movie-card__button`;

  return (
    <button className={className} type="button">
      {renderIcon()}
      <span>{title}</span>
    </button>
  );
};

MovieHeroButton.propTypes = {
  type: PropTypes.oneOf([`play`, `list`]),
};

export default MovieHeroButton;
