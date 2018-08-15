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

class MPExcludedSongComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.navigate('MyProfileScreen', { backFromPublishedOrDraft: true });
  };

  render() {
    return (
      <View style={styles.container}>
        <MPText style={ styles.title }>Música excluída com sucesso!</MPText>
        <MPGradientButton style={ styles.button } title={'OK'}   textSize={16} onPress={this.handleBack.bind(this)}/>

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
  button: {
    marginHorizontal: 115,
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPExcludedSong = connect(mapStateToProps)(MPExcludedSongComponent);
export { MPExcludedSong };
