import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import FilmCard from '../film-card/film-card.jsx';

class FilmsList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentFilm: null,
    };
  }

  render() {
    const {movies, clickHandler} = this.props;

    const handlePreview = (film) => {
      this.setState({
        currentFilm: film,
      });
    };
    const stopPreview = () => {
      this.setState({
        currentFilm: null,
      });
    };

    return (
      <div className="catalog__movies-list">
        {movies.map((movie) => (
          <FilmCard
            movie={movie}
            clickHandler={clickHandler}
            handlePreview={handlePreview}
            stopPreview={stopPreview}
            key={movie.title}
          />
        ))}
      </div>
    );
  }
}

FilmsList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.oneOf([
      `crime`, `thriller`, `comedy`, `family`, `documentary`, `horror`, `drama`
    ]).isRequired,
  })).isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default FilmsList;
