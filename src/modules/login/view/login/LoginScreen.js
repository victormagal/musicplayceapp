import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  ScrollView, StyleSheet, View
} from 'react-native';
import {LoginComponent} from './LoginComponent';
import {ForgotPasswordMessage} from '../forgot/ForgotPasswordMessage';
import {login} from '../../../../state/action';


class LoginScreenContainer extends Component {

  componentWillReceiveProps(nextProps){
    if(nextProps.loginSuccess){
      this.props.navigation.replace('home');
    }
  }

  handleSubmit = (user) => {
   this.props.dispatch(login(user));
  };

  handleForgotPassword = () => {
    this.props.navigation.navigate('message', {component: ForgotPasswordMessage, onRegister: this.handleRegister});
  };

  handleRegister = () => {
    this.props.navigation.navigate('register');
  };

  render() {
    return (
      <LoginComponent onRegister={this.handleRegister} onSubmit={this.handleSubmit}
                      onForgotPassword={this.handleForgotPassword} error={this.props.loginError}
                      loading={this.props.loading}/>
    );
  }
}

const mapStateToProps = ({authReducer}) => {
  return {...authReducer}
};

const LoginScreen = connect(mapStateToProps)(LoginScreenContainer);
export {LoginScreen}
