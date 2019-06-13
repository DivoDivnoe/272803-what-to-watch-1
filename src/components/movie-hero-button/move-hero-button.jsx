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
    renderIcon(isInList) {
      if (!isInList) {
        return (
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#add"></use>
          </svg>
        );
      }

      return (
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg>
      );
    },
  }
};

const MovieHeroButton = (props) => {
  const {type, isInList, onClick} = props;
  const {title, renderIcon} = MovieHeroButtonType[type];

  return (
    <button
      className={`btn btn--${type} movie-card__button`}
      type="button"
      onClick={onClick}
    >
      {renderIcon(isInList)}
      <span>{title}</span>
    </button>
  );
};

MovieHeroButton.propTypes = {
  type: PropTypes.oneOf([`play`, `list`]),
  isInList: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MovieHeroButton;
