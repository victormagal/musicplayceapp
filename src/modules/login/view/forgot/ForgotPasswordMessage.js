import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet, 
  View
} from 'react-native';
import { recoverPassword } from '../../../../state/action';
import { ForgotPasswordSuccessComponent } from './ForgotPasswordSuccessComponent';
import { ForgotPasswordComponent } from './ForgotPasswordComponent';


class ForgotPasswordContainer extends Component {

  componentWillReceiveProps(nextProps){
    if(nextProps.recoverPasswordSuccess){
      this.props.navigation.replace('message', {component: ForgotPasswordSuccessComponent})
    }
  }

  handleLoginAgain = () => {
    this.props.navigation.pop();
  };

  handleSubmit = (user) => {
    this.props.dispatch(recoverPassword(user));
  };

  handleRegister = () => {
    this.props.navigation.pop();
    let {onRegister} = this.props.navigation.state.params;
    onRegister();
  };

  render() {
    return (
      <ForgotPasswordComponent error={this.props.recoverPasswordError} onLoginAgain={this.handleLoginAgain} onSubmit={this.handleSubmit} onRegister={this.handleRegister}/>
    );
  }
}

const mapStateToProps = ({authReducer}) => {
  return {...authReducer};
};

const ForgotPasswordMessage = connect(mapStateToProps)(ForgotPasswordContainer);
export {ForgotPasswordMessage};
