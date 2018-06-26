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

class MPReportedProfileComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <MPText style={ styles.title }>Obrigado por contribuir com uma MusicPlayce cada vez melhor.</MPText>
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
    fontFamily: 'montSerrat',
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 115,
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPReportedProfile = connect(mapStateToProps)(MPReportedProfileComponent);
export { MPReportedProfile };