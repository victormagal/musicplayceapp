import React from 'react';
import {
  StyleSheet, 
  View
} from 'react-native';
import {
  MPGradientButton, 
  ProfileIndicatorCE, 
  MPHeader
} from '../../../../src/components';
import { LinearGradient } from 'expo';


class HomeScreen extends React.Component {
  
  goToProfile(){
    let { navigate } = this.props.navigation;
    navigate("profile");
  };

  goToConfiguration(){
    let { navigate } = this.props.navigation;
    navigate("settings");
  };
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader />
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
    display: 'flex',
    flex: 1
  },
  gradient: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    width: 230,
    marginBottom: 10
  }
});

export {HomeScreen};
