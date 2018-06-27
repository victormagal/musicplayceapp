import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
    MPText,
  MPGradientButton,
  MPHelpSuccess
} from '../../components';
import { saveProfile } from '../../state/action';
import { MPUnpublishedSong } from '../../components';

class MPUnblockProfileComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleFoward = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <MPText style={ styles.title }>Deseja desbloquear Nora Robb?</MPText>
        <MPText style={ styles.subTitle }>Ao desbloquear o usuário, seu perfil voltará a ser visto por ele. Reativando esse contato, vocês poderão trocar mensagens novamente..</MPText>
        <MPGradientButton style={ styles.button } title={'Desbloquear'}   textSize={16} onPress={this.handleFoward.bind(this)}/>
        <MPGradientButton style={ styles.button } title={'Manter bloqueado'} textSize={16} onPress={this.handleBack.bind(this)}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30
  },
  title: {
    marginBottom: 20,
    marginHorizontal: 40,
    fontSize: 24,
    color : '#000',
    fontFamily: 'montSerrat',
    textAlign: 'center',
  },
  subTitle: {
    marginHorizontal: 40,
    fontSize: 16,
    fontFamily: 'probaProRegular',
    color: '#686868',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 54,
    marginBottom: 20,
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPUnblockProfile = connect(mapStateToProps)(MPUnblockProfileComponent);
export { MPUnblockProfile };