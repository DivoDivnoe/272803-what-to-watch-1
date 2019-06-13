import PropTypes from 'prop-types';
import {appGenres} from './constants';

const PropType = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    posterImage: PropTypes.string,
    description: PropTypes.string,
    director: PropTypes.string,
    starring: PropTypes.arrayOf(PropTypes.string),
    rating: PropTypes.number,
    scoresCount: PropTypes.number,
    backgroundImage: PropTypes.string,
    backgroundColor: PropTypes.string,
    released: PropTypes.number,
    genre: PropTypes.oneOf(appGenres),
    previewVideoLink: PropTypes.string,
    previewImage: PropTypes.string,
    videoLink: PropTypes.string,
    runTime: PropTypes.number,
    isFavorite: PropTypes.bool,
  }),
  userData: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
  }),
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

export default PropType;
