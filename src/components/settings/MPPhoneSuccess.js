import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  MPGradientButton,
  MPText
} from '../../components';

class MPPhoneSuccessComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <MPText style={styles.title}>Telefone atualizado com sucesso</MPText>
        <MPGradientButton style={styles.button} textSize={16} title="OK" onPress={this.handleBack} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30
  },
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

const MPPhoneSuccess = connect(mapStateToProps)(MPPhoneSuccessComponent);
export { MPPhoneSuccess };