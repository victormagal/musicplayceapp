import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoginComponent } from './LoginComponent';
import { ForgotPasswordMessage } from '../forgot/ForgotPasswordMessage';
import { login, socialLogin, recoverPassword } from '../../../../state/action';
import { fetchProfile } from "../../../../state/profile/profileAction";
import DeepLinking from 'react-native-deep-linking';
import { Linking } from 'react-native';

class LoginScreenContainer extends Component {

  componentWillReceiveProps(nextProps) {

    if (nextProps.loginSuccess) {
      this.props.dispatch(fetchProfile()).then(response => {
        this.props.navigation.replace('home');
      });
    }
  }

  componentDidMount() {
    DeepLinking.addScheme('musicplayce://');
    Linking.addEventListener('url', this.handleUrl);
    Linking.getInitialURL().then((url) => {
      if (url && url.indexOf('musicplayce://logged_id') > -1) {
        this.props.dispatch(socialLogin(url));
      }
    }).catch(err => console.error('An error occurred', err));
  }

  handleUrl = ({ url }) => {
    Linking.canOpenURL(url).then(() => {
      if (url && url.indexOf('musicplayce://logged_id') > -1) {
        this.props.dispatch(socialLogin(url));
      }
    });
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleUrl);
  }

  handleSubmit = (user) => {
    this.props.dispatch(login(user));
  };

  handleForgotPassword = () => {
    this.props.navigation.navigate('message', {
      back: true,
      component: ForgotPasswordMessage,
      onRegister: this.handleRegister,
      onSubmit: this.handleRecoverPassword
    });
  };

  handleRegister = () => {
    this.props.navigation.navigate('register');
  };

  handleRecoverPassword = (email) => {
    this.props.dispatch(recoverPassword(email));
  };

  render() {
    return (
      <LoginComponent onRegister={this.handleRegister}
        onSubmit={this.handleSubmit}
        onForgotPassword={this.handleForgotPassword}
        error={this.props.loginError}
        loading={this.props.loading} />
    );
  }
}

const mapStateToProps = ({ authReducer }) => {
  return { ...authReducer }
};

const LoginScreen = connect(mapStateToProps)(LoginScreenContainer);
export { LoginScreen }
