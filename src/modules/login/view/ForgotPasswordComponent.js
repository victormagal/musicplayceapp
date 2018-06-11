import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MPText, MPTextField, MPGradientButton} from '../../../components';


class ForgotPasswordComponent extends Component{

  render(){
    return (
      <View style={styles.container}>
        <MPText style={styles.forgotTitle}>Esqueceu a senha?</MPText>
        <MPText style={styles.forgotText}>Digite o email ou celular cadastrado para enviarmos um link de redefinição de senha.</MPText>
        <MPTextField label="E-mail ou celular"/>
        <MPGradientButton title={"Enviar"} textSize={16} />
        <MPText style={styles.remember}>Lembrou?</MPText>
        <MPText style={styles.tryAgain}>Tente fazer seu login novamente</MPText>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 31
  },
  forgotTitle: {
    fontFamily: 'montSerrat',
    fontSize: 24,
    color: '#000'
  },
  forgotText:{
    fontFamily: 'probaProRegular',
    fontSize: 16,
    color: '#686868'
  },
  remember: {
    marginTop: 30,
    fontFamily: 'montSerrat',
    fontSize: 16,
    alignSelf: 'center',
  },
  tryAgain: {
    fontSize: 16,
    color: '#4a90e2',
    textDecorationLine: 'underline',
    fontFamily: 'montSerratMedium',
    alignSelf: 'center',
  },
});

export {ForgotPasswordComponent};

