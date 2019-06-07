import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {appGenres} from '../../reducer/data/data';

const TIMEOUT = 1000;

class FilmCard extends PureComponent {
  constructor(props) {
    super(props);

    this._articleRef = React.createRef();
    this._mouseEnterHandler = this._mouseEnterHandler.bind(this);
  }

  render() {
    const {
      renderPlayer,
      isLoading,
      movie,
    } = this.props;

    const link = `/film/${movie.id}`;

    return (
      <article
        ref={this._articleRef}
        className="small-movie-card catalog__movies-card"
        onMouseEnter={isLoading ? null : this._mouseEnterHandler}
      >
        <Link to={link}>
          {renderPlayer({width: `280`, height: `175`})}
        </Link>
        <h3 className="small-movie-card__title" >
          <Link className="small-movie-card__link" to={link}>
            {movie.name}
          </Link>
        </h3>
      </article>
    );
  }

  componentWillUnmount() {
    const article = this._articleRef.current;

    article.onmouseenter = null;
    article.onmouseleave = null;

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  _mouseEnterHandler(evt) {
    const {currentTarget} = evt;
    const {movie, handlePreview, stopPreview} = this.props;

    this.timeoutId = setTimeout(() => {
      handlePreview(movie.name);
    }, TIMEOUT);

    currentTarget.onmouseleave = () => {
      stopPreview();
      clearTimeout(this.timeoutId);
      console.log('leave')
      currentTarget.onmouseleave = null;
      delete this.timeoutId;
    };
  }
}

FilmCard.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    rating: PropTypes.number.isRequired,
    scoresCount: PropTypes.number.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    genre: PropTypes.oneOf(appGenres).isRequired,
  }),
  renderPlayer: PropTypes.func.isRequired,
  stopPreview: PropTypes.func.isRequired,
  handlePreview: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default FilmCard;
