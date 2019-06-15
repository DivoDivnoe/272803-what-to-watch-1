import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import PropType from '../../proptypes.js';

const TIMEOUT = 1000;

class FilmCard extends PureComponent {
  constructor(props) {
    super(props);

    this._articleRef = React.createRef();

    this._handleMouseEnter = this._handleMouseEnter.bind(this);
  }

  render() {
    const {
      isLoading,
      movie,
      renderPlayer,
    } = this.props;

    const link = `/film/${movie.id}`;

    return (
      <article
        ref={this._articleRef}
        className="small-movie-card catalog__movies-card"
        onMouseEnter={isLoading ? null : this._handleMouseEnter}
      >
        <Link to={link}>
          {renderPlayer({
            size: {width: `280`, height: `175`},
            className: ``,
          })}
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

  _handleMouseEnter(evt) {
    const {currentTarget} = evt;
    const {movie, onStartPreview, onStopPreview} = this.props;

    this.timeoutId = setTimeout(() => {
      onStartPreview(movie.name);
    }, TIMEOUT);

    currentTarget.onmouseleave = () => {
      onStopPreview();
      clearTimeout(this.timeoutId);
      currentTarget.onmouseleave = null;
      delete this.timeoutId;
    };
  }
}

FilmCard.propTypes = {
  movie: PropType.movie,
  isLoading: PropTypes.bool.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  onStopPreview: PropTypes.func.isRequired,
  onStartPreview: PropTypes.func.isRequired,
};

export default FilmCard;
