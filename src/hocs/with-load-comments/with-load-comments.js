import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import createAPI from '../../api';
import {StatusCode} from '../../constants';

const withLoadComments = (Component) => {
  class WithLoadComments extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {reviews: []};
      this.api = createAPI();
    }

    componentDidMount() {
      this.api
        .get(`/comments/${this.props.id}`)
        .then((response) => {
          if (response.status === StatusCode.OK) {
            this.setState({reviews: response.data});
          }
        });
    }

    render() {
      return <Component reviews={this.state.reviews} />;
    }
  }

  WithLoadComments.propTypes = {
    id: PropTypes.number.isRequired,
  };

  return WithLoadComments;
};


export default withLoadComments;
