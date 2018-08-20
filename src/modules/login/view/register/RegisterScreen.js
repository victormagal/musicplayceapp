import React, { Component } from 'react';
import {connect} from 'react-redux';
import {RegisterComponent} from './RegisterComponent';
import {createUser, uploadImage} from '../../../../state/action';


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
    const { imageFile } = user;
    delete user.imageFile;
    this.setState({ email: user.email });
    this.props.dispatch(createUser(user)).then(response => {
      /*if (imageFile !== null) {
        this.props.dispatch(uploadImage(imageFile, response.data.id))
      }*/
    });
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <RegisterComponent
        onBackClick={this.handleBackClick}
        onRegister={this.handleRegister}
        loading={this.props.loading}
        error={this.props.createUserError}/>
    );
  }
}


const mapStateToProps = ({profileReducer}) => {
  return {...profileReducer};
};

const RegisterScreen = connect(mapStateToProps)(RegisterScreenContainer);
export {RegisterScreen};
