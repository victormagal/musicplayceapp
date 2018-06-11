import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {MPHeader, MPText, MPButton, MPTextField, MPTextPassword, MPGradientButton} from '../../../components';
import {ForgotPasswordComponent} from './ForgotPasswordComponent';
import {MPFacebookIcon, MPGoogleIcon} from '../../../assets/svg';
import {LinearGradient} from 'expo';


const BaseIcon = (props, Icon) => (
  <View {...props}>
    <View style={styles.iconContainer}>
      <Icon style={styles.icon}/>
      <View style={styles.divider}/>
    </View>
  </View>
);

const FacebookIcon = (props) => {
  return BaseIcon(props, MPFacebookIcon);
};

const GoogleIcon = (props) => {
  return BaseIcon(props, MPGoogleIcon);
};

class LoginScreen extends Component {

  state = {
    error: false,
    form: {
      usuario: '',
      senha: ''
    }
  };

  inputErrorProps = {error: 'Campo inválido', errorColor: '#e13223'};

  handleChangeText(name, value){
    let newState = {...this.state};
    newState.form[name] = value;
    this.setState({...newState, error: false});
  }

  handleSubmit = () => {
    let {form} = this.state;

    if(!form.usuario || !form.senha){
      this.setState({error: true});
    }
  };

  handleForgotPassword = () => {
    this.props.navigation.navigate('message', {component: ForgotPasswordComponent});
  };

  handleRegister = () => {
    this.props.navigation.navigate('register');
  };

  render() {
    let inputTextProps = this.state.error ? this.inputErrorProps : {};

    return (
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={["#e1322373", "#ffffff8C"]}
          style={styles.gradient}
          start={[0, 0]}
          end={[0, 0.6]}>

          <MPHeader inverse={true}/>
          <MPText style={styles.title}>Bem-vindo ao MusicPlayce</MPText>
          <MPButton icon={FacebookIcon} title="Entre com Facebook" textSize={16} onPress={() => {}} style={styles.signinFB}/>
          <MPButton icon={GoogleIcon} title="Entre com Google+" textSize={16} onPress={() => {}} style={styles.signinGoogle}/>

          {!this.state.error && (
            <View>
              <MPText style={styles.ouText}>ou</MPText>
              <MPText style={styles.signinUser}>Entre com seu usuário</MPText>
            </View>
          )}

          {this.state.error && (
            <View>
              <MPText style={styles.deuRuimText}>Deu ruim! Confirme se o login e senha foram digitados corretamente.</MPText>
              <MPText style={styles.confiraText}>Confira os dados do usuário</MPText>
            </View>
          )}

          <MPTextField label={"Usuário"} value={this.state.form.usuario} onChangeText={this.handleChangeText.bind(this, 'usuario')} textProps={inputTextProps} />
          <MPTextPassword label={"Senha"} value={this.state.form.senha} onChangeText={this.handleChangeText.bind(this, 'senha')} textProps={inputTextProps} />

          <View style={styles.signinContainer}>
            <MPGradientButton title={"Entrar"} textSize={16} style={styles.signinButton} onPress={this.handleSubmit}/>
            <MPText style={styles.forgotPassword} onPress={this.handleForgotPassword}>Esqueceu a senha?</MPText>
          </View>

          <MPText style={styles.noAccount} onPress={this.handleRegister}>Não tem conta?</MPText>
          <MPText style={styles.register} onPress={this.handleRegister}>Faça seu cadastro.</MPText>

        </LinearGradient>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20
  },
  button: {
    width: 230,
    marginBottom: 10
  },
  title: {
    fontFamily: 'montSerrat',
    fontSize: 24,
    marginTop: 30,
    textAlign: 'center',
    width: 267,
    alignSelf: 'center'
  },
  signinContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  signinButton: {
    width: '45%'
  },
  signinFB: {
    backgroundColor: '#236cc2',
    marginTop: 30
  },
  signinGoogle: {
    backgroundColor: '#e13627',
    marginTop: 20
  },
  ouText: {
    fontSize: 16,
    fontFamily: 'montSerrat',
    alignSelf: 'center',
    marginTop: 20
  },
  signinUser: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'montSerratMedium',
    alignSelf: 'center',
    marginTop: 20
  },
  forgotPassword: {
    width: '45%',
    fontFamily: 'probaProRegular',
    alignSelf: 'center',
    color: '#5994db',
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  noAccount: {
    marginTop: 30,
    fontFamily: 'montSerrat',
    fontSize: 16,
    alignSelf: 'center',
  },
  register: {
    fontSize: 16,
    color: '#4a90e2',
    textDecorationLine: 'underline',
    fontFamily: 'montSerratMedium',
    alignSelf: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    height: 40,
    width: 48
  },
  icon:{
    alignSelf: 'center',
    width: 47,
    height: 20
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#fff'
  },
  deuRuimText:{
    fontFamily: 'montSerratMedium',
    fontSize: 16,
    marginTop: 40,
    textAlign: 'center'
  },
  confiraText: {
    marginTop: 20,
    fontFamily: 'montSerrat',
    fontSize: 12,
    color: '#e13223'
  }
});

export {LoginScreen}
