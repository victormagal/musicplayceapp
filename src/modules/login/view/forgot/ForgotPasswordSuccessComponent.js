import React, { Component } from 'react';
import {
  StyleSheet, 
  View
} from 'react-native';
import {
  MPGradientButton,
  MPText
} from '../../../../components';


class ForgotPasswordSuccessComponent extends Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <MPText style={styles.forgotTitle}> A ajuda está a caminho! Enviamos um link de redefinição de senha para você.</MPText>

        <MPText style={styles.forgotText}>
          Acesse o link para re-definir sua senha.
        </MPText>

        <MPGradientButton title="Ir para a página inicial" textSize={16} onPress={this.handleBack}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    flex: 1
  },
  forgotTitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 24,
    lineHeight: 26,
    color: '#000',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20
  },
  forgotText: {
    marginBottom: 20,
    fontFamily: 'ProbaPro-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#686868',
    textAlign: 'center'
  },
});

export {ForgotPasswordSuccessComponent};

