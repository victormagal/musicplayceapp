import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MPText, MPTextField, MPGradientButton} from '../../../components';
import {ForgotPasswordSuccessComponent} from './ForgotPasswordSuccessComponent';


class ForgotPasswordComponent extends Component {

  state = {
    error: false,
    form: {
      email: ''
    }
  };

  inputErrorProps = {error: 'Campo inválido', errorColor: '#e13223'};

  handleLoginAgain = () => {
    this.props.navigation.pop();
  };

  handleChangeEmail = (value) => {
    let newState = {...this.state};
    newState.form.email = value;
    this.setState({...newState, error: false});
  };

  handleSubmit = () => {
    if (!this.state.form.email) {
      this.setState({error: true});
    }else{
      this.props.navigation.replace('message', {component: ForgotPasswordSuccessComponent})
    }
  };

  handleRegister = () => {

  };

  render() {
    let inputTextProps = this.state.error ? this.inputErrorProps : {};

    return (
      <View style={styles.container}>
        <MPText style={styles.forgotTitle}>Esqueceu a senha?</MPText>

        {!this.state.error && (
          <MPText style={styles.forgotText}>Digite o email ou celular cadastrado para enviarmos um link de redefinição
            de senha.
          </MPText>
        )}

        {this.state.error && (
          <MPText style={styles.forgotTextError}>Não encontramos sua conta. Confira se e email foi digitado
            corretamente.
          </MPText>
        )}

        <MPTextField label="E-mail ou celular" textProps={inputTextProps} onChangeText={this.handleChangeEmail}/>
        <MPGradientButton title="Enviar" textSize={16} style={styles.enviarText} onPress={this.handleSubmit}/>

        {this.state.error && (
          <View style={{flex: 2}}>
            <MPText style={styles.remember}>Não tem conta?</MPText>
            <MPText style={styles.tryAgain} onPress={this.handleRegister}>Faça seu cadastro</MPText>
          </View>
        )}

        <View style={{flex: 1}}>
          <MPText style={styles.remember}>Lembrou?</MPText>
          <MPText style={styles.tryAgain} onPress={this.handleLoginAgain}>Tente fazer seu login novamente</MPText>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 31,
    flex: 1
  },
  forgotTitle: {
    fontFamily: 'montSerrat',
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20
  },
  forgotText: {
    fontFamily: 'probaProRegular',
    fontSize: 16,
    lineHeight: 20,
    color: '#686868',
    textAlign: 'center'
  },
  forgotTextError: {
    fontFamily: 'probaProRegular',
    fontSize: 16,
    lineHeight: 20,
    color: '#e13223',
    textAlign: 'center'
  },
  enviarText: {
    marginTop: 20,
    width: 130,
    alignSelf: 'center'
  },
  remember: {
    marginTop: 30,
    lineHeight: 20,
    fontFamily: 'montSerrat',
    fontSize: 16,
    alignSelf: 'center',
  },
  tryAgain: {
    lineHeight: 20,
    fontSize: 16,
    color: '#4a90e2',
    textDecorationLine: 'underline',
    fontFamily: 'montSerratMedium',
    alignSelf: 'center',
  },
});

export {ForgotPasswordComponent};

