import React from 'react';
import {StyleSheet, Text, View, TextInput, Picker} from 'react-native';
import { TextField } from 'react-native-material-textfield';

class MusicLetterScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: '', language: 'default'};

  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTop}>Pode colar a letra da música aqui:</Text>
        <TextField 
        label='Letra da Música'
        value={this.state.text}
        labelFontSize={16}
        multiline={true}
        lineWidth={1}
        baseColor={'#b1b1b1'} />
        <View style={[styles.clickableTextContainer, {marginTop: 20}]}>
          <Text>ou </Text>
          <Text style={styles.clickableText}>faça upload da letra(doc, tx ou rtf)</Text>
        </View>
        <View style={ styles.pickerContainer }>
          <Picker
              selectedValue={this.state.language}
              onValueChange={(itemValue, itemIndex) => itemValue != 'default' ? this.setState({language: itemValue}) : {}}
              mode={'dropdown'}
              style={ {color: "#b1b1b1"} }>
              <Picker.Item label="Idioma" value="default" style={styles.notEnabled}  />
              <Picker.Item label="Português" value="pt" />
              <Picker.Item label="Inglês" value="en" />
              <Picker.Item label="Espanhol" value="es" />
          </Picker>
        </View>
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
  },
  clickableTextContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    height: 20
  },
  clickableText: {
    borderBottomWidth: 1,
    borderColor: '#5994db',
    textAlign: 'center',
    color: '#5994db',
    fontSize: 14,
  },
  pickerContainer: {
    height: 46,
    marginTop: 30,
    borderColor: '#b1b1b1',
    borderBottomWidth: 1,
  },
  notEnabled: {
    backgroundColor: '#686868',
  }
});

export {MusicLetterScreen};