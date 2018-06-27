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

class MPBlockProfileComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleFoward = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <MPText style={ styles.title }>Deseja bloquear Fernanda Almeida?</MPText>
        <MPText style={ styles.subTitle }>Ao confirmar o bloqueio, não será possível trocas novas mensagens com esse usuário, mas o histórico de conversas (as mensagens trocadas) ainda poderão ser visualizadas.</MPText>
        <MPGradientButton style={ styles.button } title={'Bloquear'}   textSize={16} onPress={this.handleFoward.bind(this)}/>
        <MPGradientButton style={ styles.button } title={'Manter ativa'} textSize={16} onPress={this.handleBack.bind(this)}/>
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

const MPBlockProfile = connect(mapStateToProps)(MPBlockProfileComponent);
export { MPBlockProfile };