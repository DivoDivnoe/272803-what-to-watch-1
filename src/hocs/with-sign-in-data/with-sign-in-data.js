import React, {PureComponent} from 'react';

const withSignInData = (Component) => {
  class WithSignInData extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``,
        statusCode: null,
      };

      this._setEmail = this._setEmail.bind(this);
      this._setPassword = this._setPassword.bind(this);
      this._setStatusCode = this._setStatusCode.bind(this);
    }

    render() {
      const {email, password, statusCode} = this.state;

      return (
        <Component
          {...this.props}
          email={email}
          password={password}
          statusCode={statusCode}
          changeEmail={this._setEmail}
          changePassword={this._setPassword}
          setStatusCode={this._setStatusCode}
        />
      );
    }

    _setEmail(email) {
      this.setState({email});
    }

    _setPassword(password) {
      this.setState({password});
    }

    _setStatusCode(statusCode) {
      this.setState({statusCode});
    }
  }

  return WithSignInData;
};

export default withSignInData;
