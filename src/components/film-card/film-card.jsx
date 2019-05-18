import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player.jsx';

const TIMEOUT = 1000;

class FilmCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };

    this._chooseFilm = this._chooseFilm.bind(this);
    this._mouseEnterHandler = this._mouseEnterHandler.bind(this);
  }

  render() {
    const {movie, isPlaying} = this.props;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this.state.isLoading ? null : this._mouseEnterHandler}
      >
        <VideoPlayer
          image={movie.image}
          preview={movie.preview}
          isPlaying={isPlaying}
          handleLoaded={() => {
            this.setState({isLoading: false});
          }}
        />
        <h3 className="small-movie-card__title" >
          <a className="small-movie-card__link" href="movie-page.html" onClick={this._chooseFilm}>
            {movie.title}
          </a>
        </h3>
      </article>
    );
  }

  _chooseFilm(evt) {
    const {movie, clickHandler} = this.props;

    evt.preventDefault();

    clickHandler(movie);
  }

  _mouseEnterHandler(evt) {
    const {movie, stopPreview, handlePreview} = this.props;
    const {currentTarget} = evt;

    const timeoutId = setTimeout(() => {
      handlePreview(movie.title);
    }, TIMEOUT);

    currentTarget.onmouseleave = () => {
      stopPreview();
      clearTimeout(timeoutId);
      currentTarget.onmouseleave = null;
    };
  }
}

FilmCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    genre: PropTypes.oneOf([
      `crime`, `thriller`, `comedy`, `family`, `documentary`, `horror`, `drama`
    ]).isRequired,
  }),
  clickHandler: PropTypes.func.isRequired,
  handlePreview: PropTypes.func.isRequired,
  stopPreview: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default FilmCard;
