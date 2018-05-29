import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { TextField } from 'react-native-material-textfield';

class TitleScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: ''};
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTop}>Escreva o título da música.</Text>
        <TextField 
        label='Título da música'
        value={this.state.text}
        labelFontSize={16}
        lineWidth={1}
        baseColor={'#b1b1b1'} />
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
    flexDirection: 'column'
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    height: 20,
    marginBottom: 20,
  },
  textInputContainer: {
    height: 46,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#b1b1b1',
    padding: 5
  },
  textInput: {
    borderColor: 'transparent',
  }
});

export {TitleScreen};