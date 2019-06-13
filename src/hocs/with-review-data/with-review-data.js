import React, {PureComponent} from 'react';
import createAPI from '../../api';
import PropTypes from 'prop-types';
import {StatusCode} from '../../constants';
import PropType from '../../proptypes.js';

const withReviewData = (Component) => {
  class WithReviewData extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 0,
        comment: ``,
        isLoading: false,
      };

      this._setRating = this._setRating.bind(this);
      this._setMessage = this._setMessage.bind(this);
      this._submitForm = this._submitForm.bind(this);
      this._toggleIsLoading = this._toggleIsLoading.bind(this);
    }

    render() {
      const {rating, comment, isLoading} = this.state;

      return (
        <Component
          {...this.props}
          rating={rating}
          comment={comment}
          isLoading={isLoading}
          setRating={this._setRating}
          setMessage={this._setMessage}
          submitHandler={this._submitForm}
        />
      );
    }

    _setRating(newRating) {
      this.setState({
        rating: newRating,
      });
    }

    _setMessage(newMessage) {
      this.setState({
        comment: newMessage,
      });
    }

    _toggleIsLoading() {
      this.setState({isLoading: !this.state.isLoading});
    }

    _submitForm() {
      const api = createAPI();
      const {film, history} = this.props;
      const {rating, comment} = this.state;

      this._toggleIsLoading();

      api
        .post(`/comments/${film.id}`, {rating, comment})
        .then((response) => {
          if (response.status === StatusCode.OK) {
            history.push(`/film/${film.id}`);
          }
        })
        .catch((error) => {
          this._toggleIsLoading();

          if (error.response.status === StatusCode.FORBIDDEN) {
            history.push(`/login?redirect=/film/${film.id}/review`);
          }
        });
    }
  }

  WithReviewData.propTypes = {
    film: PropType.movie,
    history: PropTypes.object.isRequired,
  };

  return WithReviewData;
};

export default withReviewData;
