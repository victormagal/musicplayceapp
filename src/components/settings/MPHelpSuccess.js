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

class MPHelpSuccessComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleFoward = () => {
    this.props.navigation.replace('message', { component: MPPhoneSuccess });
  };

  render() {
    return (
      <View style={styles.container}>
        <MPText style={styles.title}>Retornaremos em até 24 horas úteis. Obrigado pelo contato.</MPText>
        <MPGradientButton style={styles.button} textSize={16} title="Enviar outra dúvida" onPress={this.handleBack} />
        <MPGradientButton style={styles.button} textSize={16} title="Voltar para configurações" onPress={this.handleBack} />
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
    marginHorizontal: 20,
    marginTop: 20
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPHelpSuccess = connect(mapStateToProps)(MPHelpSuccessComponent);
export { MPHelpSuccess };