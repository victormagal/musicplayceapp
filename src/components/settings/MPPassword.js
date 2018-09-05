import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Share,
  StyleSheet
} from 'react-native';
import {
  MPText,
  MPGradientButton
} from '../../components';
import { MPNotFillledSettingsIcon } from '../../assets/svg';

class MPPasswordComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.navigate('homeSettings');
  };

  handleSendMe = () => {
    const { navigation } = this.props;
    const navigationParams = navigation.state.params;
    Share.share({
      title: 'MusicPlayce',
      message: 'Senha atualizada com sucesso! Sua nova senha no MusicPlayce é: '+ navigationParams.newPassword,
      dialogTitle: 'Nova senha',
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <MPText style={styles.title}>
          Enviar nova senha para meus dispositivos autorizados.
        </MPText>
        <MPGradientButton
          style={styles.button}
          textSize={16}
          title="Enviar nova senha para mim"
          onPress={this.handleSendMe}
        />
        <MPGradientButton
          style={styles.button}
          icon={MPNotFillledSettingsIcon}
          textSize={16}
          title="Voltar para configurações"
          onPress={this.handleBack}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    marginHorizontal: 40
  },
  button: {
    marginHorizontal: 20,
    marginTop: 20
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPPassword = connect(mapStateToProps)(MPPasswordComponent);
export { MPPassword };
