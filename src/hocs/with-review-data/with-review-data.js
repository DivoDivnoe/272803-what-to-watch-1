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

      this._handleSetRating = this._handleSetRating.bind(this);
      this._handleSetMessage = this._handleSetMessage.bind(this);
      this._handleSubmitForm = this._handleSubmitForm.bind(this);
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
          onSetRating={this._handleSetRating}
          onSetMessage={this._handleSetMessage}
          onSubmit={this._handleSubmitForm}
        />
      );
    }

    _handleSetRating(newRating) {
      this.setState({
        rating: newRating,
      });
    }

    _handleSetMessage(newMessage) {
      this.setState({
        comment: newMessage,
      });
    }

    _toggleIsLoading() {
      this.setState({isLoading: !this.state.isLoading});
    }

    _handleSubmitForm() {
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
