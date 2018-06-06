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
  MPText,
  MPPhoneSuccess
} from '../../components';

class MPPhoneComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };
  
  handleFoward = () => {
    this.props.navigation.replace('messageConfiguration', { component: MPPhoneSuccess });
  };

  render() {
    return (
      <View>
        <MPText style={styles.title}>Enviamos um código via SMS para seu novo número</MPText>
        <MPText style={styles.subtitle}>Digite aqui o código enviado para o número: (21) 99999-9999</MPText>
        <MPGradientButton style={styles.button} textSize={16} title="Cancelar" onPress={this.handleBack} />
        <MPGradientButton style={styles.button} textSize={16} title="Reenviar SMS" onPress={this.handleFoward} />
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
  subtitle: {
    fontFamily: 'montSerrat',
    fontSize: 16,
    textAlign: 'center',
    color: '#686868',
    marginHorizontal: 40,
    marginVertical: 20
  },
  button: {
    marginHorizontal: 20,
    marginTop: 20
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPPhone = connect(mapStateToProps)(MPPhoneComponent);
export { MPPhone };