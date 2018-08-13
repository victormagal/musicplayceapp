import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
    MPText,
  MPGradientButton
} from '../../components';
import { stopFollowUser } from '../../state/action';

class MPConfirmStopFollowComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleStopFollow = () => {
    let {profile, from} =  this.props;
    this.props.dispatch(stopFollowUser(profile, from));
    this.props.navigation.pop();
  };

  render() {
    let {profile} =  this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <MPText style={ styles.title }>Parar de seguir{"\n"} {profile.name}?</MPText>
        <MPText style={ styles.subTitle }>As informações, troca de mensagens e indicações ficarão escondidas. Para reativá-la, basta segui-la novamente.</MPText>
        <MPGradientButton style={ styles.button } title={'Parar de seguir'}   textSize={16} onPress={this.handleStopFollow}/>
        <MPGradientButton style={ styles.button } title={'Continuar seguindo'} textSize={16} onPress={this.handleBack}/>
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

const mapStateToProps = () => {
  return {};
};

const MPConfirmStopFollow = connect(mapStateToProps)(MPConfirmStopFollowComponent);
export { MPConfirmStopFollow };
