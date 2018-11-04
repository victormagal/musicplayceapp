import React, {Component} from 'react';
import {
  ScrollView, StyleSheet, View, TouchableWithoutFeedback, ImageBackground, Linking
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  MPGradientButton, MPHeader, MPText, MPInput, MPForm,
  MPFormButton, MPLoading, MPButton
} from '../../../../components';
import {
  MPFacebookIcon, MPGoogleIcon
} from '../../../../assets/svg';
import LinearGradient from 'react-native-linear-gradient';
import {API} from '../../../../service/api';

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

class LoginComponent extends Component {

  state = {
    form: {
      login: '',
      password: ''
    }
  };

  handleChangeText = ({name, value}) => {
    let newState = {...this.state};
    newState.form[name] = value;
    this.setState({...newState});
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.form);
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ImageBackground style={{flex: 1, width: '100%'}} source={require('../../../../assets/img/album-default.png')}>
          <LinearGradient
            colors={["#f0cfcf73", "#ffffffFF"]}
            style={styles.gradient}
            start={{x:0, y:0.0}} end={{x:0, y:0.7}}>
            <MPHeader style={styles.header} inverse={true}/>

            <KeyboardAwareScrollView>
                <View style={styles.container}>
                  <MPText style={styles.title}>Bem-vindo ao MusicPlayce</MPText>

                  <MPButton icon={FacebookIcon} title="Entre com Facebook" textSize={16} onPress={ ()=>{ Linking.openURL(`${API}/oauth/facebook`)}} style={styles.signinFB}/>
                  <MPButton icon={GoogleIcon} title="Entre com Google+" textSize={16} onPress={ ()=>{ Linking.openURL(`${API}/oauth/google`)}} style={styles.signinGoogle}/>

                  {!this.props.error && (
                    <View>
                      <MPText style={styles.ouText}>ou</MPText>
                      <MPText style={styles.signinUser}>Entre com seu usuário</MPText>
                    </View>
                  )}

                  {this.props.error && (
                    <View>
                      <MPText style={styles.deuRuimText}>Deu ruim! Confirme se o login e senha foram digitados corretamente.</MPText>
                      <MPText style={styles.confiraText}>Confira os dados do usuário</MPText>
                    </View>
                  )}

                    <MPForm>
                      <MPInput
                        label="E-mail ou Usuário"
                        name="login" value={this.state.form.login}
                        onChangeText={this.handleChangeText}
                        validators={['required']}
                        autoCapitalize={'none'}
                        error={this.props.error ? 'E-mail ou usuário inválido' : ''}
                      />
                      <MPInput
                        label={"Senha"}
                        name="password"
                        value={this.state.form.password}
                        onChangeText={this.handleChangeText}
                        validators={['required']}
                        secureTextEntry={true}
                        autoCapitalize={'none'}
                        error={this.props.error ? 'Senha inválida' : ''}
                      />

                      <View style={styles.signinContainer}>
                        <MPFormButton>
                          <MPGradientButton title={"Entrar"} textSize={16} style={styles.signinButton} onPress={this.handleSubmit} />
                        </MPFormButton>
                        <MPText style={styles.forgotPassword} onPress={this.props.onForgotPassword}>Esqueceu a senha?</MPText>
                      </View>
                    </MPForm>

                    <TouchableWithoutFeedback onPress={this.props.onRegister}>
                      <View>
                        <MPText style={styles.noAccount}>Não tem conta?</MPText>
                        <MPText style={styles.register}>Faça seu cadastro.</MPText>
                      </View>
                    </TouchableWithoutFeedback>
                </View>
            </KeyboardAwareScrollView>
            <MPLoading visible={this.props.loading} />
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 30
  },
  gradient: {
    flex: 1,
  },
  header: {
    marginTop: 20,
  },
  button: {
    width: 230,
    marginBottom: 10
  },
  title: {
    fontFamily: 'Montserrat-Regular',
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
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'center',
    marginTop: 20
  },
  signinUser: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
    alignSelf: 'center',
    marginTop: 20
  },
  forgotPassword: {
    width: '45%',
    fontFamily: 'ProbaPro-Regular',
    alignSelf: 'center',
    color: '#5994db',
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  noAccount: {
    marginTop: 30,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    alignSelf: 'center',
  },
  register: {
    fontSize: 16,
    color: '#4a90e2',
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat-Medium',
    alignSelf: 'center'
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
  deuRuimText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    marginTop: 40,
    textAlign: 'center'
  },
  confiraText: {
    marginTop: 20,
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#e13223'
  }
});

export {LoginComponent}
