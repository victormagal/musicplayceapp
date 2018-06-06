import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  fetchProfile,
  saveProfile
} from '../../state/action';
import {
  MPGradientButton,
  MPText
} from '../../components';

class MPMailSuccessComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View>
        <MPText style={styles.title}>E-mail atualizado com sucesso</MPText>
        <MPGradientButton style={styles.button} textSize={16} title="OK" onPress={this.handleBack} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'montSerrat',
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    marginHorizontal: 40
  },
  button: {
    marginHorizontal: 135,
    marginTop: 20
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPMailSuccess = connect(mapStateToProps)(MPMailSuccessComponent);
export { MPMailSuccess };