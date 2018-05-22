import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { TextField } from 'react-native-material-textfield';

class ISRCScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: ''};
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTop}>Informe o ISRC, caso a música já esteja registrada:</Text>
        <TextField 
        label='Nº do ISRC'
        value={this.state.text}
        labelFontSize={16}
        multiline={true}
        lineWidth={1}
        baseColor={'#686868'}
        onChangeText={(text) => this.setState({text})} />
        <View style={[styles.clickableTextContainer, {marginTop: 76}]}>
          <Text style={styles.clickableText}>A gravação ainda nao está registrada.</Text>
        </View>
        <View style={[styles.clickableTextContainer, {marginTop: 20}]}>
          <Text style={styles.clickableText}>Eu não sei o que é ISRC.</Text>
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
    height: 20
  },
  clickableText: {
    borderBottomWidth: 1,
    borderColor: '#5994db',
    textAlign: 'center',
    color: '#5994db',
    fontSize: 14,
  }
});

export {ISRCScreen};