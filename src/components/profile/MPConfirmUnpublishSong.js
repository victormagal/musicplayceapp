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

class MPConfirmUnpublishSongComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleFoward = () => {
    this.props.navigation.navigate('message', {component: MPUnpublishedSong})
  };

  render() {
    return (
      <View style={styles.container}>
        <MPText style={ styles.title }>Confirma que deseja despublicar sua música?</MPText>
        <MPText style={ styles.subTitle }>Todas as informações sobre sua música, inclusive indicações, serão guardadas e ninguém terá acesso as informações. Caso queira reativá-la, basta republicá-la.</MPText>
        <MPGradientButton style={ styles.button } title={'Sim, despublicar música'}   textSize={16} onPress={this.handleFoward.bind(this)}/>
        <MPGradientButton style={ styles.button } title={'Não, manter ativa'} textSize={16} onPress={this.handleBack.bind(this)}/>
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
    marginHorizontal: 23,
    fontSize: 24,
    color : '#000',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  subTitle: {
    marginHorizontal: 45,
    fontSize: 16,
    fontFamily: 'ProbaPro-Regular',
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

const MPConfirmUnpublishSong = connect(mapStateToProps)(MPConfirmUnpublishSongComponent);
export { MPConfirmUnpublishSong };
