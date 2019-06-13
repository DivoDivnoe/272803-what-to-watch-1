import React, {PureComponent} from 'react';
import PropType from '../../proptypes.js';
import PlayerMain from '../../components/player-main/player-main.jsx';
import withLoading from '../with-loading/with-loading';
import withPlayerControls from '../with-player-controls/with-player-controls';

const Player = withPlayerControls(withLoading(PlayerMain));

const withPlayerActive = (Component) => {
  class WithPlayerActive extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlayerActive: false,
      };

      this._togglePlayerMode = this._togglePlayerMode.bind(this);
    }

    render() {
      const {isPlayerActive} = this.state;
      const {film} = this.props;

      if (!isPlayerActive) {
        return (
          <Component
            {...this.props}
            switchPlayer={this._togglePlayerMode}
          />
        );
      }

      return <Player movie={film} switchPlayer={this._togglePlayerMode} />;
    }

    _togglePlayerMode() {
      this.setState({isPlayerActive: !this.state.isPlayerActive});
    }
  }

  WithPlayerActive.propTypes = {
    film: PropType.movie,
  };

  return WithPlayerActive;
};

export default withPlayerActive;
