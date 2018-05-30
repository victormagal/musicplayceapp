import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MPGradientButton, ProfileIndicatorCE} from '../../../src/components';
import {LinearGradient} from 'expo';

class HomeScreen extends React.Component {
  
  goToProfile(){
    console.log("navigate is not working")
    let { navigate } = this.props.navigation;
    navigate("profile");
  };

  goToConfiguration(){
    let { navigate } = this.props.navigation;
    navigate("configuration");
      console.log("navigate is not working")

  };
  
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={["#e13223", "#ffffff"]} style={styles.gradient}>
          <MPGradientButton style={styles.button} title="TITLE" onPress={() => this.goToProfile()}/>
          <MPGradientButton style={styles.button} title="PERFIL" onPress={() => this.goToProfile()}/>
          <MPGradientButton style={styles.button} title="CONFIGURAÇÕES" onPress={() => this.goToConfiguration()}/>
          
          <View style={{flexDirection: 'row', flex: 1}}>
            <ProfileIndicatorCE style={{marginTop: 10, flex: 1}} title="Indicações Feitas" subtitle="Explore" count={4}/>
            <ProfileIndicatorCE style={{marginTop: 10, flex: 1}} title="Seguidores" subtitle="Convide seus amigos"/>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gradient: {
    flex: 1,
    paddingTop: 18,
    alignItems: 'center'
  },
  button: {
    width: 230
  }
});

export {HomeScreen};