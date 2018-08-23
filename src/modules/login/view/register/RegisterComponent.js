import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableWithoutFeedback, View, TouchableOpacity, Platform, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {MPGradientButton, MPText, MPLoading, MPInput, MPForm, MPFormButton, MPHeader} from '../../../../components';
import {
  MPArrowDownRedIcon,
  MPArrowUpRedIcon,
  MPCameraIcon,
  MPFacebookIcon,
  MPGoogleIcon,
  MPLogoRegisterIcon,
  MPProfileIcon
} from '../../../../assets/svg';
import {MPCircleGradientButton} from "../../../../components/buttons";
import ImagePicker from "react-native-image-picker";
import {MPFloatingNotification} from "../../../../components/general";
import {fetchTermsAndConditions} from "../../../../state/settings/termsAndConditions/termsAction";


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
      password: '',
      imageFile: null
    },
    imageSizeError: false,
    linearGradientHeight: 0
  };

  icons = {
    up: MPArrowUpRedIcon,
    down: MPArrowDownRedIcon
  };

  componentDidUpdate() {
    if (this.props.error) {
      this.handleToggleRegisterForm();
    }
  }

  handleToggleRegisterForm = () => {
    const extraMargin = Platform.OS === 'ios' ? 15 : 21;
    this.scrollViewRef.scrollToPosition(0, this.state.linearGradientHeight + extraMargin);
  };

  handleClickPhoto = () => {
    const options = {
      title: 'Selecionar uma foto',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        this.handleChange({ name: 'imageFile', value: null });
        console.log('User cancelled image picker');
      } else if (response.error) {
        this.handleChange({ name: 'imageFile', value: null });
        console.log('ImagePicker Error: ', response.error);
      } else if (response.fileSize > 2000000) {
        this.handleChange({ name: 'imageFile', value: null });
        this.setState({ imageSizeError: true });
        const timer = setTimeout(() => {
          this.setState({ imageSizeError: false });
          clearTimeout(timer);
        }, 2000);
      } else {
        this.handleChange({ name: 'imageFile', value: response });
      }
    });
  };

  handleRegister = () => {
    this.props.onRegister(this.state.form);
  };

  handleChange = ({name, value}) => {
    let newState = {...this.state};
    newState.form[name] = value;
    this.setState({newState});
  };

  getTerms = () => {
    this.props.navigation.navigate('termsAndConditions', { justFetch: true, back: false })
  }

  render() {
    let IconRegister = this.state.formVisible ? this.icons.up : this.icons.down;
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView style={styles.container} ref={ref => this.scrollViewRef = ref}>
          <ImageBackground style={{flex: 1, width: '100%'}} source={require('../../../../assets/img/album-default.png')}>
            <LinearGradient
              onLayout={event => this.setState({ linearGradientHeight: event.nativeEvent.layout.height })}
              colors={["#f0cfcf73", "#ffffffff"]} style={styles.gradient} start={{x:0, y:0}} end={{x:0, y:1}}>
              <MPHeader back={true} onBack={this.props.onBackClick} withoutLogo={true} inverse={true} redBack={true}/>
              <View style={styles.contentCreateAccount}>
                <MPLogoRegisterIcon style={styles.logo}/>
                <MPText style={styles.title}>O seu lugar de música</MPText>
                <MPText style={styles.register}>Crie sua conta</MPText>
                {/*<MPButton icon={FacebookIcon} title="Entre com Facebook" textSize={16} onPress={() => {}} style={styles.signinFB}/>*/}
                {/*<MPButton icon={GoogleIcon} title="Entre com Google+" textSize={16} onPress={() => {}} style={styles.signinGoogle}/>*/}
                {/*<MPText style={styles.ouText}>ou</MPText>*/}
                <TouchableWithoutFeedback onPress={this.handleToggleRegisterForm}>
                  <View>
                    <MPText style={styles.fillForm}>Preencha o cadastro</MPText>
                    <IconRegister style={styles.fillFormArrow}/>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </LinearGradient>
          </ImageBackground>
          <View style={[styles.form, { marginTop: 42 }]}>
            {this.props.error && (
              <View>
                <MPText style={styles.deuRuimText}>
                  Deu ruim! Confirme se os dados foram digitados corretamente.
                </MPText>
              </View>
            )}

            {this.props.formError && (
              <View>
                <MPText style={[styles.deuRuimText, { marginTop: 10, marginBottom: 20 }]}>
                  { this.props.formError }
                </MPText>
              </View>
            )}
            <MPForm>
              <View style={{ alignItems: 'center', marginBottom: 15 }}>
                <MPCircleGradientButton
                  icon={this.state.form.imageFile ? this.state.form.imageFile.uri : MPCameraIcon}
                  label='Adicionar foto'
                  isImage={!!this.state.form.imageFile}
                  style={{ height: 100, width: 100 }}
                  onPress={this.handleClickPhoto}
                />
                <TouchableOpacity style={styles.plusButton} onPress={this.handleClickPhoto}>
                  <MPText style={styles.plusText}>
                    +
                  </MPText>
                </TouchableOpacity>
              </View>
              <MPInput
                label="E-mail"
                name="email"
                autoCapitalize={'none'}
                value={this.state.form.email}
                validators={['required', 'email']}
                onChangeText={this.handleChange}/>
              <MPInput
                label="Nome"
                name="name"
                value={this.state.form.name}
                validators={['required']}
                onChangeText={this.handleChange}/>
              <MPInput
                label="Sobrenome"
                name="last_name"
                value={this.state.form.last_name}
                validators={['required']}
                onChangeText={this.handleChange}/>
              <MPInput
                label="Usuário"
                name="username"
                autoCapitalize={'none'}
                value={this.state.form.username}
                validators={['required']}
                onChangeText={this.handleChange}/>
              <MPInput
                label="Senha"
                name="password"
                autoCapitalize={'none'}
                value={this.state.form.password}
                validators={['required']}
                secureTextEntry={true}
                onChangeText={this.handleChange}/>

              <TouchableOpacity onPress={this.getTerms} opacity={1}>
                <MPText style={styles.termsMessage}>
                  Ao criar sua conta você está aceitando os
                  <MPText style={styles.termsText}> termos e condições de uso</MPText> da Music Playce.
                </MPText>
              </TouchableOpacity>

              <View>
                <MPFormButton>
                  <MPGradientButton title="Começar" textSize={16} onPress={this.handleRegister} />
                </MPFormButton>
              </View>

              <MPText style={styles.copyright}>Copyright • Music Playce 2018</MPText>
            </MPForm>

          </View>
        </KeyboardAwareScrollView>
        <MPLoading visible={this.props.loading} />
        <MPFloatingNotification
          visible={this.state.imageSizeError}
          icon={<MPProfileIcon/>}
          text="Imagem muito grande. Tente usar outra."
        />
      </View>
    );
  }
}

RegisterComponent.propTypes = {
  onRegister: PropTypes.func.isRequired,
  onBackClick: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  gradient: {
    flex: 1
  },
  contentCreateAccount:{
    paddingHorizontal: 40
  },
  form: {
    marginTop: 10,
    paddingHorizontal: 40
  },
  logo: {
    marginTop: 40,
    alignSelf: 'center'
  },
  plusButton: {
    zIndex: 999,
    position: 'absolute',
    width: 27,
    height: 27,
    bottom: 0,
    right: '35%',
    borderRadius: 27/2,
    borderWidth: 1,
    borderColor: "#CCC",
    backgroundColor: '#FFF'
  },
  plusText: {
    fontSize: 25,
    fontWeight: '500',
    color: '#657BDE',
    textAlign: 'center',
    marginTop: -7
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
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#e13223'
  }
});

export {RegisterComponent}
