import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
    MPText,
  MPGradientButton,
  MPHelpSuccess,
  MPTextField,
  MPReportedProfile
} from '../../components';
import { saveProfile } from '../../state/action';

class MPConfirmReportProfileComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleFoward = () => {
    this.props.navigation.navigate('message', {component: MPReportedProfile})
  };

  render() {
    return (
      <View style={styles.container}>
        <MPText style={ styles.title }>O que está pegando?</MPText>
        <MPText style={ styles.subTitle }>Descreva sua denúncia.</MPText>
        <MPTextField label={"Texto da denúnca"} style={styles.textFieldContainer} multiline={true} value={"Inspirações rock"} style={{marginHorizontal: 40, marginBottom: 40}}/>
        <MPGradientButton style={ styles.button } title={'Fazer denúncia'}   textSize={16} onPress={this.handleFoward.bind(this)}/>
        <MPGradientButton style={ styles.button } title={'Cancelar'} textSize={16} onPress={this.handleBack.bind(this)}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30
  },
  title: {
    marginBottom: 30,
    marginHorizontal: 40,
    fontSize: 24,
    color : '#000',
    fontFamily: 'montSerrat',
    textAlign: 'center',
  },
  subTitle: {
    marginHorizontal: 46,
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

const MPConfirmReportProfile = connect(mapStateToProps)(MPConfirmReportProfileComponent);
export { MPConfirmReportProfile };