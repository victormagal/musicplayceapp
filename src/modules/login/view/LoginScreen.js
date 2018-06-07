import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import {MPHeader, MPText, MPButton, MPTextField, MPGradientButton} from '../../../components';

import {LinearGradient} from 'expo';


class LoginScreenComponent extends Component{
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#e1322373", "#ffffff8C"]}
          style={styles.gradient}
          start={[0, 0]}
          end={[0, 0.6]}>

            <MPHeader inverse={true} />
            <MPText style={{fontFamily: 'montSerrat', fontSize: 24, marginTop: 30, textAlign: 'center', width: 267, alignSelf: 'center'}}>Bem-vindo ao MusicPlayce</MPText>
            <MPButton title="Entre com Facebook" onPress={() => {}} style={{backgroundColor: '#236cc2', marginTop: 30}}/>
            <MPButton title="Entre com Google+" onPress={() => {}} style={{backgroundColor: '#e13627', marginTop: 20}}/>

            <MPText style={{fontFamily: 'montSerrat', alignSelf: 'center', marginTop: 20}}>ou</MPText>
            <MPText style={{fontFamily: 'montSerrat', alignSelf: 'center', marginTop: 20}}>Entre com seu usuário</MPText>

            <MPTextField label={"Usuário"} value={''}/>
            <MPTextField label={"Senha"} value={''}/>

            <View style={{flexDirection: 'row'}}>
              <MPGradientButton title={"Entrar"} />
              <MPText>Esqueceu a senha?</MPText>
            </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  },
  gradient: {
    flex: 1,
    padding: 40
  },
  button: {
    width: 230,
    marginBottom: 10
  }
});

const mapToStateToProps = () => {
  return {};
};

const LoginScreen = connect(mapToStateToProps)(LoginScreenComponent);
export {LoginScreen}
