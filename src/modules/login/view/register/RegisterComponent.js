import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView, StyleSheet, TouchableWithoutFeedback, View
} from 'react-native';
import {
  MPButton, MPGradientButton, MPText, MPLoading, MPInput, MPForm, MPFormButton
} from '../../../../components';
import {
  MPArrowDownRedIcon, MPArrowUpRedIcon, MPFacebookIcon, MPGoogleIcon, MPLogoRegisterIcon
} from '../../../../assets/svg';
import LinearGradient from 'react-native-linear-gradient';


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

class RegisterComponent extends Component {

  state = {
    error: false,
    formVisible: false,
    form: {
      email: '',
      name: '',
      last_name: '',
      username: '',
      password: ''
    }
  };

  icons = {
    up: MPArrowUpRedIcon,
    down: MPArrowDownRedIcon
  };
  
  constructor(props){
    super(props);
    this.scrollViewRef = React.createRef();
  }

  handleToggleRegisterForm = () => {
    this.scrollViewRef.current.scrollToEnd();
  };

  handleRegister = () => {
    this.props.onRegister(this.state.form);
  };

  handleChange = ({name, value}) => {
    let newState = {...this.state};
    newState.form[name] = value;
    this.setState({newState});
  };

  render() {
    let IconRegister = this.state.formVisible ? this.icons.up : this.icons.down;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} ref={this.scrollViewRef}>
          <LinearGradient colors={["#e1322373", "#ffffff8C"]} style={styles.gradient} start={{x:0, y:0}} end={{x:0, y:1}}>
            <MPLogoRegisterIcon style={styles.logo}/>
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

            {this.props.error && (
              <View>
                <MPText style={styles.deuRuimText}>Deu ruim! Confirme se os dados foram digitados corretamente.</MPText>
              </View>
            )}

            <MPForm>
              <MPInput label="Email" name="email" value={this.state.form.email} validators={['required', 'email']} onChangeText={this.handleChange}/>
              <MPInput label="Nome" name="name" value={this.state.form.name} validators={['required']} onChangeText={this.handleChange}/>
              <MPInput label="Sobrenome" name="last_name" value={this.state.form.last_name} validators={['required']} onChangeText={this.handleChange}/>
              <MPInput label="Usuário" name="username" value={this.state.form.username} validators={['required']} onChangeText={this.handleChange}/>
              <MPInput label="Senha" name="password" value={this.state.form.password} validators={['required']} secureTextEntry={true} onChangeText={this.handleChange}/>
              <MPText style={styles.termsMessage}>
                Ao criar sua conta você está aceitando os
                <MPText style={styles.termsText}> termos e condições de uso</MPText> da Music Playce.
              </MPText>
              <MPFormButton>
                <MPGradientButton title="Começar" textSize={16} onPress={this.handleRegister} />
              </MPFormButton>
              <MPText style={styles.copyright}>Copyright • Music Playce 2018</MPText>
            </MPForm>

          </View>
        </ScrollView>
        <MPLoading visible={this.props.loading} />
      </View>
    );
  }
}

RegisterComponent.propTypes = {
  onRegister: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    fontFamily: 'ProbaPro-Regular',
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
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'center',
    marginTop: 20
  },
  fillForm: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
    alignSelf: 'center',
    marginTop: 20
  },
  fillFormArrow: {
    marginTop: 10,
    alignSelf: 'center'
  },
  register: {
    marginTop: 144,
    fontFamily: 'Montserrat-Bold',
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
    fontFamily: 'ProbaPro-Regular',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30
  },
  termsText: {
    fontFamily: 'ProbaPro-Regular',
    color: '#5994db',
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  copyright: {
    marginTop: 40,
    marginBottom: 45,
    fontFamily: 'ProbaPro-Regular',
    fontSize: 14,
    color: '#4a4a4a8C',
    alignSelf: 'center'
  },
  deuRuimText: {
    marginTop: 20,
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#e13223'
  }
});

export {RegisterComponent}
