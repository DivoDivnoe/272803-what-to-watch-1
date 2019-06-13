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

      this._setEmail = this._setEmail.bind(this);
      this._setPassword = this._setPassword.bind(this);
      this._setStatusCode = this._setStatusCode.bind(this);
      this._toggleIsLoading = this._toggleIsLoading.bind(this);
      this._submitForm = this._submitForm.bind(this);
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
          changeEmail={this._setEmail}
          changePassword={this._setPassword}
          setStatusCode={this._setStatusCode}
          handleSubmitForm={this._submitForm}
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

    _toggleIsLoading() {
      this.setState({isLoading: !this.state.isLoading});
    }

    _submitForm() {
      const {authUserHandler, history} = this.props;
      const {email, password} = this.state;

      this._toggleIsLoading();

      const path = history.location.search.split(`=`)[1];
      const onSuccess = () => history.push(path);
      const onFail = (status) => {
        this._setStatusCode(status);
        this._toggleIsLoading();
      };

      authUserHandler({email, password}, onSuccess, onFail);
    }
  }

  WithSignInData.propTypes = {
    authUserHandler: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  return WithSignInData;
};

export default withSignInData;
