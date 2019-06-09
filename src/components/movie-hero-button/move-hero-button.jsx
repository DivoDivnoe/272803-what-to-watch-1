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
  const {type, clickHandler, isInList, disabled} = props;
  const {title, renderIcon} = MovieHeroButtonType[type];

  const className = `btn btn--${type} movie-card__button`;

  return (
    <button className={className} type="button" onClick={clickHandler} disabled={disabled}>
      {renderIcon(isInList)}
      <span>{title}</span>
    </button>
  );
};

MovieHeroButton.propTypes = {
  type: PropTypes.oneOf([`play`, `list`]),
  clickHandler: PropTypes.func.isRequired,
  isInList: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default MovieHeroButton;
