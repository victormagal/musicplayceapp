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
import { MPExcludedSong } from '../../components';
class MPConfirmExcludeSongComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleFoward = () => {
    this.props.navigation.navigate('message', {component: MPExcludedSong})
  };

  render() {
    return (
      <View style={styles.container}>
        <MPText style={ styles.title }>Tem certeza que deseja excluir sua música?</MPText>
        <MPText style={ styles.subTitle }>Não será possível resgatar as indicações e outras interações que você teve com essa música. Caso queira, poderá cadastrá-la novamente e recomeçar uma interação do zero.</MPText>
        <MPGradientButton style={ styles.button } title={'Sim, excluir música'}   textSize={16} onPress={this.handleFoward.bind(this)}/>
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
    marginHorizontal: 40,
    fontSize: 24,
    color : '#000',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  subTitle: {
    marginHorizontal: 20,
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

const MPConfirmExcludeSong = connect(mapStateToProps)(MPConfirmExcludeSongComponent);
export { MPConfirmExcludeSong };
