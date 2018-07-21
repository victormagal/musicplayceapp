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

class MPConfirmStopFollowComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleFoward = () => {
    this.props.dispatch(saveProfile({isFollowing: false}))
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <MPText style={ styles.title }>Parar de seguir{"\n"}Ivete Sangalo?</MPText>
        <MPText style={ styles.subTitle }>As informações, troca de mensagens e indicações ficarão escondidas. Para reativá-la, basta segui-la novamente.</MPText>
        <MPGradientButton style={ styles.button } title={'Parar de seguir'}   textSize={16} onPress={this.handleFoward.bind(this)}/>
        <MPGradientButton style={ styles.button } title={'Continuar seguindo'} textSize={16} onPress={this.handleBack.bind(this)}/>
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

const MPConfirmStopFollow = connect(mapStateToProps)(MPConfirmStopFollowComponent);
export { MPConfirmStopFollow };
