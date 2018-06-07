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
  MPMailSuccess
} from '../../components';

class MPMailComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleFoward = () => {
    this.props.navigation.replace('message', { component: MPMailSuccess });
  };

  render() {
    return (
      <View>
        <MPText style={styles.title}>Uma mensagem de confirmação foi enviada para o seu novo e-mail de cadastro</MPText>
        <MPText style={styles.subtitle}>Se você ainda não recebeu essa mensagem, clique em reenviar</MPText>
        <MPGradientButton style={styles.button} textSize={16} title="Cancelar" onPress={this.handleBack} />
        <MPGradientButton style={styles.button} textSize={16} title="Reenviar" onPress={this.handleFoward} />
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

const MPMail = connect(mapStateToProps)(MPMailComponent);
export { MPMail };