import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withLoadComments = (Component) => {
  class WithLoadComments extends PureComponent {
    render() {
      return <Component {...this.props} />;
    }

    componentDidMount() {
      this.props.onLoadComments(this.props.id);
    }

    componentWillUnmount() {
      this.props.onDeleteComments();
    }
  }

  WithLoadComments.propTypes = {
    id: PropTypes.number.isRequired,
    onLoadComments: PropTypes.func.isRequired,
    onDeleteComments: PropTypes.func.isRequired,
  };

  return WithLoadComments;
};


export default withLoadComments;
