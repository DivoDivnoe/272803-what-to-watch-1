import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PropType from '../../proptypes.js';

const withPlayerActive = (Component) => {
  class WithPlayerActive extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlayerActive: false,
      };

      this._togglePlayerMode = this._togglePlayerMode.bind(this);
    }

    _togglePlayerMode() {
      this.setState({isPlayerActive: !this.state.isPlayerActive});
    }

    render() {
      const {isPlayerActive} = this.state;

      return (
        <Component
          {...this.props}
          isPlayerActive={isPlayerActive}
          switchPlayer={this._togglePlayerMode}
        />
      );
    }
  }

  WithPlayerActive.propTypes = {
    movies: PropTypes.arrayOf(PropType.movie).isRequired,
  };

  return WithPlayerActive;
};

export default withPlayerActive;
