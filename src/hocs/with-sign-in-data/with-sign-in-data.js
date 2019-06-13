import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withSignInData = (Component) => {
  class WithSignInData extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``,
        statusCode: null,
        isLoading: false,
      };

      this._handleSetEmail = this._handleSetEmail.bind(this);
      this._handleSetPassword = this._handleSetPassword.bind(this);
      this._handleSetStatusCode = this._handleSetStatusCode.bind(this);
      this._toggleIsLoading = this._toggleIsLoading.bind(this);
      this._handleSubmitForm = this._handleSubmitForm.bind(this);
    }

    render() {
      const {email, password, statusCode, isLoading} = this.state;

      return (
        <Component
          {...this.props}
          email={email}
          password={password}
          statusCode={statusCode}
          isLoading={isLoading}
          onChangeEmail={this._handleSetEmail}
          onChangePassword={this._handleSetPassword}
          onSetStatusCode={this._handleSetStatusCode}
          onSubmitForm={this._handleSubmitForm}
        />
      );
    }

    _handleSetEmail(email) {
      this.setState({email});
    }

    _handleSetPassword(password) {
      this.setState({password});
    }

    _handleSetStatusCode(statusCode) {
      this.setState({statusCode});
    }

    _toggleIsLoading() {
      this.setState({isLoading: !this.state.isLoading});
    }

    _handleSubmitForm() {
      const {onAuthUser, history} = this.props;
      const {email, password} = this.state;

      this._toggleIsLoading();

      const path = history.location.search.split(`=`)[1];

      const handleSuccess = () => history.push(path);
      const handleFail = (status) => {
        this._handleSetStatusCode(status);
        this._toggleIsLoading();
      };

      onAuthUser({email, password}, handleSuccess, handleFail);
    }
  }

  WithSignInData.propTypes = {
    onAuthUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  return WithSignInData;
};

export default withSignInData;
