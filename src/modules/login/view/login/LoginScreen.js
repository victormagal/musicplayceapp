import React, {Component} from 'react';
import {connect} from 'react-redux';
import {LoginComponent} from './LoginComponent';
import {ForgotPasswordMessage} from '../forgot/ForgotPasswordMessage';
import {login} from '../../../../state/action';
import {fetchProfile} from "../../../../state/profile/profileAction";


class LoginScreenContainer extends Component {

  componentWillReceiveProps(nextProps){
    if(nextProps.loginSuccess){
      this.props.dispatch(fetchProfile()).then(response => {
        if (response && response.payload.accepted_terms_at === null) {
          this.props.navigation.replace('termsAndConditions');
        } else {
          this.props.navigation.replace('home');
        }
      });
    }
  }

  handleSubmit = (user) => {
   this.props.dispatch(login(user));
  };

  handleForgotPassword = () => {
    this.props.navigation.navigate('message', {component: ForgotPasswordMessage, onRegister: this.handleRegister, onSubmit: this.handleRecoverPassword});
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
                      loading={this.props.loading}/>
    );
  }
}

const mapStateToProps = ({authReducer}) => {
  return {...authReducer}
};

const LoginScreen = connect(mapStateToProps)(LoginScreenContainer);
export {LoginScreen}
