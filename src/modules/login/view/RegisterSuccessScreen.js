import React, { Component } from 'react';
import {
  StyleSheet, 
  View
} from 'react-native';
import {
  MPGradientButton, 
  MPHeader,
  MPText
} from '../../../components';


class RegisterSuccessScreen extends Component {

  handleContinue = () => {

  };

  handleBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.parent}>
        <MPHeader back={true} onBack={this.handleBack}/>
        <View style={styles.container}>
        <MPText style={styles.title}>
          Enviamos um e-mail com link de verificação para
          <MPText style={styles.email}> email@email.com</MPText>
        </MPText>
        <MPText style={styles.clique}>Clique lá para ativar sua conta</MPText>
        <MPGradientButton title="Continuar" textSize={16} style={styles.continueButton} onPress={this.handleContinue}/>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  title: {
    fontFamily: 'montSerrat',
    lineHeight: 26,
    fontSize: 24,
    textAlign: 'center'
  },
  email: {
    fontFamily: 'montSerratBold',
    lineHeight: 26,
    fontSize: 24,
    color: '#e13223'
  },
  clique:{
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'probaProRegular',
    fontSize: 16,
    color: '#686868'
  },
  continueButton: {
    position: 'absolute',
    bottom: 40,
    width: 154,
    alignSelf: 'center'
  }
});

export {RegisterSuccessScreen}
