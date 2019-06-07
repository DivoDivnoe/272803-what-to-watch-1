import React, {PureComponent} from 'react';

const withPlaying = (Component) => {
  class WithPlaying extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
      };
    }

    _toggleState() {
      this.setState({
        isPlaying: !this.state.isPlaying,
      });
    }

    render() {
      return <Component {...this.props} isPlaying={this.state.isPlaying} />;
    }
  }

  return WithPlaying;
};

export default withPlaying;
