import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
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
    this.props.navigation.replace('message', { component: MPPhoneSuccess });
  };

  render() {
    const { navigation } = this.props;
    const { data } = navigation.state.params;
    return (
      <View style={styles.container}>
        <MPText style={styles.title}>
          Enviamos um código via SMS para seu novo número
        </MPText>
        <MPText style={styles.subtitle}>
          Digite aqui o código enviado para o número: { data }
        </MPText>
        <View style={{ flexDirection: 'row' }}>
          <MPGradientButton style={styles.button} textSize={16} title="Cancelar" onPress={this.handleBack} />
          <MPGradientButton style={styles.button} textSize={16} title="Reenviar SMS" onPress={this.handleFoward} />
        </View>
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
  subtitle: {
    fontFamily: 'montSerrat',
    fontSize: 16,
    textAlign: 'center',
    color: '#686868',
    marginHorizontal: 40,
    marginVertical: 20
  },
  button: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPPhone = connect(mapStateToProps)(MPPhoneComponent);
export { MPPhone };
