import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { TextField } from 'react-native-material-textfield';

class MusicDescriptionScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: ''};
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTop}>Explique um pouquinho sobre sua música.</Text>
        <TextField 
        label='Descrição'
        value={this.state.text}
        labelFontSize={16}
        multiline={true}
        lineWidth={1}
        baseColor={'#686868'}
        onChangeText={(text) => this.setState({text})}/>
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

export {MusicDescriptionScreen};