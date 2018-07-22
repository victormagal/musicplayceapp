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

class MPUnpublishedSongComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <MPText style={ styles.title }>Música despublicada.</MPText>
        <MPText style={ styles.subTitle }>Caso queira tornar a música acessível aos seus contatos, basta republicá-la a qualquer momento.</MPText>
        <MPGradientButton style={ styles.button } title={'OK'} textSize={16} onPress={this.handleBack.bind(this)}/>
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
    marginHorizontal: 115,
    marginBottom: 20,
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPUnpublishedSong = connect(mapStateToProps)(MPUnpublishedSongComponent);
export { MPUnpublishedSong };
