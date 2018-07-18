import React, {Component} from 'react';
import {
  ScrollView, StyleSheet, View
} from 'react-native';
import {
  MPButton, MPGradientButton, MPHeader, MPText, MPInput, MPForm,
  MPFormButton, MPLoading
} from '../../../../components';
import {
  MPFacebookIcon, MPGoogleIcon
} from '../../../../assets/svg';
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

class LoginComponent extends Component {

  state = {
    form: {
      login: 'user@gmail.com',
      password: '123456'
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
      <LinearGradient
        colors={["#e1322373", "#ffffff8C"]}
        style={styles.gradient}
        start={[0, 0]}
        end={[0, 1]}>

        <MPHeader style={styles.header} inverse={true}/>

        <ScrollView>
          <View style={styles.container}>
            <MPText style={styles.title}>Bem-vindo ao MusicPlayce</MPText>

            <MPButton icon={FacebookIcon} title="Entre com Facebook" textSize={16} onPress={() => {}} style={styles.signinFB}/>
            <MPButton icon={GoogleIcon} title="Entre com Google+" textSize={16} onPress={() => {}} style={styles.signinGoogle}/>

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
              <MPInput label="Email ou Usuário" name="login" value={this.state.form.login}
                       onChangeText={this.handleChangeText} validators={['required']} />
              <MPInput label={"Senha"} name="password" value={this.state.form.password}
                       onChangeText={this.handleChangeText} validators={['required']}
                       secureTextEntry={true}/>

              <View style={styles.signinContainer}>
                <MPFormButton>
                  <MPGradientButton title={"Entrar"} textSize={16} style={styles.signinButton} onPress={this.handleSubmit} />
                </MPFormButton>
                <MPText style={styles.forgotPassword} onPress={this.props.onForgotPassword}>Esqueceu a senha?</MPText>
              </View>
            </MPForm>

            <MPText style={styles.noAccount} onPress={this.props.onRegister}>Não tem conta?</MPText>
            <MPText style={styles.register} onPress={this.props.onRegister}>Faça seu cadastro.</MPText>

          </View>
        </ScrollView>

        <MPLoading visible={this.props.loading} />

      </LinearGradient>
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
    backgroundColor: 'white'
  },
  header: {
    marginTop: 20,
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

export {LoginComponent}
