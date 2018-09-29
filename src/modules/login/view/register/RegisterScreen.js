import React, { Component } from 'react';
import { View } from 'react-native';
import {connect} from 'react-redux';
import {RegisterComponent} from './RegisterComponent';
import {createUser} from '../../../../state/action';
import {MPLoading} from '../../../../components';

class RegisterScreenContainer extends Component {

  state = {
    email: '',
    error: null,
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.createUserSuccess){
      this.props.navigation.navigate('registerSuccess', {email: this.state.email});
    }
  }

  handleRegister = (user) => {
    this.setState({ email: user.email, error: null });
    this.props.dispatch(createUser(user)).then(response => {
      if (response.status === 500) {
        const message = response.data.message;
        if (message.includes('users_email_unique')) {
          this.setState({ error: '- Este endereço de e-mail já está cadastrado.' });
        } else if (message.includes('users_username_unique')) {
          this.setState({ error: '- Este nome de usuário já está sendo usado.' });
        }
      }
    });
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={{ height: '100%' }}>
        <RegisterComponent
          navigation={this.props.navigation}
          onBackClick={this.handleBackClick}
          onRegister={this.handleRegister}
          error={this.props.createUserError}
          formError={this.state.error}
        />
        <MPLoading visible={this.props.loading} />
      </View>
    );
  }
}


const mapStateToProps = ({profileReducer}) => {
  return {...profileReducer};
};

const RegisterScreen = connect(mapStateToProps)(RegisterScreenContainer);
export {RegisterScreen};
