import React, {Component} from 'react';
import {
  StyleSheet, View
} from 'react-native';
import {
  MPGradientButton, MPText, MPInput, MPForm, MPFormButton
} from '../../../../components';
import {recoverPassword} from '../../../../state/action';


class ForgotPasswordComponent extends Component {

  state = {
    form: {
      email: ''
    }
  };

  handleChangeEmail = ({name, value}) => {
    let newState = {...this.state};
    newState.form.email = value;
    this.setState({...newState});
  };

  render() {
    return (
      <View style={styles.container}>
        <MPText style={styles.forgotTitle}>Esqueceu a senha?</MPText>

        {!this.props.error && (
          <MPText style={styles.forgotText}>Digite o email cadastrado para enviarmos um link de redefinição
            de senha.
          </MPText>
        )}

        {this.props.error && (
          <MPText style={styles.forgotTextError}>Não encontramos sua conta. Confira se e email foi digitado
            corretamente.
          </MPText>
        )}

        <MPForm>
          <MPInput label="E-mail" name="email" value={this.state.form.email}
                   validators={['required']} onChangeText={this.handleChangeEmail}/>
          <MPFormButton>
            <MPGradientButton title="Enviar" textSize={16} style={styles.enviarText}
                              onPress={() => this.props.onSubmit(this.state.form.email)}/>
          </MPFormButton>
        </MPForm>

        <View style={{flex: 2}}>
          <MPText style={styles.remember}>Lembrou?</MPText>
          <MPText style={styles.tryAgain} onPress={this.props.onLoginAgain}>Tente fazer seu login novamente</MPText>
        </View>

        <View style={{flex: 1}}>
          <MPText style={styles.remember}>Não tem conta?</MPText>
          <MPText style={styles.tryAgain} onPress={this.props.onRegister}>Faça seu cadastro</MPText>
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
    fontFamily: 'Montserrat-Regular',
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20
  },
  forgotText: {
    fontFamily: 'ProbaPro-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#686868',
    textAlign: 'center'
  },
  forgotTextError: {
    fontFamily: 'ProbaPro-Regular',
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
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    alignSelf: 'center',
  },
  tryAgain: {
    lineHeight: 20,
    fontSize: 16,
    color: '#4a90e2',
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat-Medium',
    alignSelf: 'center',
  },
});

export {ForgotPasswordComponent};
