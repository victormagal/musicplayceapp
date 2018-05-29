import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { ButtonCE } from '../../components';

class SaveDraftScreen extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTop}>Deseja salvar como rascunho?</Text>
        <ButtonCE title="Salvar Rascunho" onPress={ () => {console.log("salvar")}} style={[styles.buttonStyle, {marginBottom: 20}]} textSize={16}/>
        <ButtonCE title="Apagar música" onPress={ () => {console.log("apagar")}} style={ styles.buttonStyle } textSize={16}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
    marginStart: 40,
    marginEnd: 40,
    flexDirection: 'column',
    alignItems: 'center'
  },
  textTop: {
    fontSize: 20,
    color: '#000000',
    height: 22,
    marginBottom: 20,
  },
  buttonStyle: {
    paddingStart: 100,
    paddingEnd: 100
  }
});

export {SaveDraftScreen};