import React, { Component } from 'react';
import {connect} from 'react-redux';
import {RegisterComponent} from './RegisterComponent';
import {createUser} from '../../../../state/action';


class RegisterScreenContainer extends Component {

  state = {
    email: ''
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.createUserSuccess){
      this.props.navigation.navigate('registerSuccess', {email: this.state.email});
    }
  }

  handleRegister = (user) => {
    this.setState({email: user.email});
    this.props.dispatch(createUser(user));
  };

  render() {
    return (
      <RegisterComponent onRegister={this.handleRegister} loading={this.props.loading} error={this.props.createUserError}/>
    );
  }
}


const mapStateToProps = ({profileReducer}) => {
  return {...profileReducer};
};

const RegisterScreen = connect(mapStateToProps)(RegisterScreenContainer);
export {RegisterScreen};
