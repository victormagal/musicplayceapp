import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import {
  MPGradientButton,
  MPText
} from '../../components';

class MPHelpSuccessComponent extends React.Component {
  handleGoTo = (route) => {
    this.props.navigation.navigate(route);
  };

  render() {
    return (
      <View style={{ marginVertical: 30 }}>
        <MPText style={styles.title}>
          Retornaremos em até 24 horas úteis. Obrigado pelo contato.
        </MPText>
        <MPGradientButton
          style={styles.button}
          textSize={16}
          title="Enviar outra dúvida"
          onPress={() => this.handleGoTo('helpSettings')}
        />
        <MPGradientButton
          style={styles.button}
          textSize={16}
          title="Voltar para configurações"
          onPress={() => this.handleGoTo('homeSettings')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Montserrat-Regular',
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
