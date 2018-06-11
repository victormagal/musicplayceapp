import React, { Component } from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  View
} from 'react-native';
import { 
  MPButton, 
  MPGradientButton, 
  MPText, 
  MPTextField 
} from '../../../components';
import {
  MPArrowDownRedIcon, 
  MPArrowUpRedIcon,
  MPFacebookIcon, 
  MPGoogleIcon, 
  MPLogoRegisterIcon 
} from '../../../assets/svg';
import { LinearGradient } from 'expo';


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

class RegisterScreen extends Component {

  state = {
    formVisible: false
  };

  icons = {
    up: MPArrowUpRedIcon,
    down: MPArrowDownRedIcon
  };

  handleToggleRegisterForm = () => {
    this.setState({formVisible: !this.state.formVisible});
  };

  handleRegister = () => {
    this.props.navigation.navigate('registerSuccess');
  };

  render() {

    let IconRegister = this.state.formVisible ? this.icons.up : this.icons.down;

    return (
      <ScrollView style={styles.container}>
        <LinearGradient colors={["#e1322373", "#ffffff8C"]} style={styles.gradient} start={[0, 0]} end={[0, 0.9]}>
          <MPLogoRegisterIcon style={{marginTop: 100, alignSelf: 'center'}}/>
          <MPText style={styles.title}>O seu lugar de música</MPText>
          <MPText style={styles.register}>Crie sua conta</MPText>
          <MPButton icon={FacebookIcon} title="Entre com Facebook" textSize={16} onPress={() => {}} style={styles.signinFB}/>
          <MPButton icon={GoogleIcon} title="Entre com Google+" textSize={16} onPress={() => {}} style={styles.signinGoogle}/>
          <MPText style={styles.ouText}>ou</MPText>
          <TouchableWithoutFeedback onPress={this.handleToggleRegisterForm}>
            <View>
              <MPText style={styles.fillForm}>Preencha o cadastro</MPText>
              <IconRegister style={styles.fillFormArrow}/>
            </View>
          </TouchableWithoutFeedback>
        </LinearGradient>
        <View style={styles.form}>
          <MPTextField label="Email" />
          <MPTextField label="Nome" />
          <MPTextField label="Sobrenome" />
          <MPTextField label="Usuário" />
          <MPTextField label="Senha" />
          <MPText style={styles.termsMessage}>
            Ao criar sua conta você está aceitando os
          <MPText style={styles.termsText}> termos e condições de uso</MPText> da Music Playce.
        </MPText>
          <MPGradientButton title="Começar" textSize={16} onPress={this.handleRegister} />
          <MPText style={styles.copyright}>Copyright • Music Playce 2017</MPText>
        </View>
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
    paddingHorizontal: 40
  },
  form: {
    marginTop: 10,
    paddingHorizontal: 40
  },
  logo: {
    marginTop: 100,
    alignSelf: 'center'
  },
  title: {
    fontFamily: 'probaProRegular',
    fontSize: 18,
    marginTop: 20,
    color: '#000',
    alignSelf: 'center'
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
  fillForm: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'montSerratMedium',
    alignSelf: 'center',
    marginTop: 20
  },
  fillFormArrow: {
    marginTop: 10,
    alignSelf: 'center'
  },
  register: {
    marginTop: 144,
    fontFamily: 'montSerratBold',
    fontSize: 24,
    alignSelf: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    height: 40,
    width: 48
  },
  icon: {
    alignSelf: 'center',
    width: 47,
    height: 20
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#fff'
  },
  termsMessage: {
    fontSize: 16,
    fontFamily: 'probaProRegular',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30
  },
  termsText: {
    fontFamily: 'probaProRegular',
    color: '#5994db',
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  copyright: {
    marginTop: 40,
    marginBottom: 45,
    fontFamily: 'probaProRegular',
    fontSize: 14,
    color: '#4a4a4a8C',
    alignSelf: 'center'
  }
});

export {RegisterScreen}
