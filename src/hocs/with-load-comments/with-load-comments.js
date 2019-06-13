import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withLoadComments = (Component) => {
  class WithLoadComments extends PureComponent {
    render() {
      return <Component {...this.props} />;
    }

    componentDidMount() {
      this.props.loadComments(this.props.id);
    }

    componentWillUnmount() {
      this.props.deleteComments();
    }
  }

  WithLoadComments.propTypes = {
    id: PropTypes.number.isRequired,
    loadComments: PropTypes.func.isRequired,
    deleteComments: PropTypes.func.isRequired,
  };

  return WithLoadComments;
};


export default withLoadComments;
