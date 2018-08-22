import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import {
  MPGradientButton,
  MPText
} from '../../components';
import { MPNotFillledSettingsIcon } from '../../assets/svg';
import {MPHeader} from "../general";

class MPHelpSuccessComponent extends React.Component {
  handleGoTo = (route) => {
    this.props.navigation.navigate(route);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MPHeader
          title={'Mensagem enviada!'}
        />
        <View style={{ marginVertical: 30, alignItems: 'center' }}>
          <MPText style={styles.title}>
            Retornaremos em até 24 horas úteis.
          </MPText>
          <MPText style={styles.title}>
            Obrigado pelo contato!
          </MPText>
          <MPGradientButton
            style={styles.button}
            textSize={16}
            title="Enviar outra dúvida"
            onPress={() => this.handleGoTo('helpSettings')}
          />
          <MPGradientButton
            style={styles.button}
            icon={MPNotFillledSettingsIcon}
            textSize={16}
            title="Voltar para configurações"
            onPress={() => this.handleGoTo('homeSettings')}
          />
        </View>
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
    width: '60%'
  },
  button: {
    width: '70%',
    marginTop: 20
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPHelpSuccess = connect(mapStateToProps)(MPHelpSuccessComponent);
export { MPHelpSuccess };
