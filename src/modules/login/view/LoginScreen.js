import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import {MPHeader, MPText, MPButton, MPTextField, MPGradientButton} from '../../../components';
import {MPFacebookIcon, MPGoogleIcon} from '../../../assets/svg';
import {LinearGradient} from 'expo';


const BaseIcon = (props, Icon) => (
  <View {...props}>
    <View style={{flexDirection:'row', height: 40, width: 48}}>
      <Icon />
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

class LoginScreenComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#e1322373", "#ffffff8C"]}
          style={styles.gradient}
          start={[0, 0]}
          end={[0, 0.6]}>

          <MPHeader inverse={true}/>
          <MPText style={styles.title}>Bem-vindo ao MusicPlayce</MPText>
          <MPButton icon={FacebookIcon} title="Entre com Facebook" textSize={16} onPress={() => {}} style={styles.signinFB}/>
          <MPButton icon={GoogleIcon} title="Entre com Google+" textSize={16} onPress={() => {}} style={styles.signinGoogle}/>

          <MPText style={styles.ouText}>ou</MPText>
          <MPText style={styles.signinUser}>Entre com seu usuário</MPText>

          <MPTextField label={"Usuário"} value={''}/>
          <MPTextField label={"Senha"} value={''}/>

          <View style={styles.signinContainer}>
            <MPGradientButton title={"Entrar"} textSize={16} style={styles.signinButton} onPress={() => {}}/>
            <MPText style={styles.forgotPassword}>Esqueceu a senha?</MPText>
          </View>

          <MPText style={styles.noAccount}>Não tem conta?</MPText>
          <MPText style={styles.register}>Faça seu cadastro.</MPText>

        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 40
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
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#fff',
    alignSelf: 'flex-end'
  }
});

const mapToStateToProps = () => {
  return {};
};

const LoginScreen = connect(mapToStateToProps)(LoginScreenComponent);
export {LoginScreen}
