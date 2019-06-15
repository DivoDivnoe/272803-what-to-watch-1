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

      this.state = {isPlayerActive: false};

      this._handleTogglePlayerMode = this._handleTogglePlayerMode.bind(this);
    }

    render() {
      const {isPlayerActive} = this.state;
      const {film} = this.props;

      if (!isPlayerActive) {
        return (
          <Component
            {...this.props}
            onSwitchPlayer={this._handleTogglePlayerMode}
          />
        );
      }

      return <Player movie={film} onSwitchPlayer={this._handleTogglePlayerMode} />;
    }

    _handleTogglePlayerMode() {
      this.setState({isPlayerActive: !this.state.isPlayerActive});
    }
  }

  WithPlayerActive.propTypes = {
    film: PropType.movie,
  };

  return WithPlayerActive;
};

export default withPlayerActive;
