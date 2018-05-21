import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

class RegisterArtistsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: "Pesquise pelo nome"};
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTop}>Essa música tem intérpretes?</Text>
        <TextInput style={styles.textInput}
          onFocus={ () => this.setState({text: ""})}
          onChangeText={ (text) => this.setState({text}) }
          value={this.state.text}/>
        <Text style={styles.clickableText}>Não, apenas eu</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginStart: 40,
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
  },
  textInput: {
    flex: 1,
    maxHeight: 45
  },
  clickableText: {
    color: '#5994db',
    textAlign: 'center',
    fontSize: 14,
    borderBottomWidth: 1,
    borderColor: '#5994db'
  }
});

export {RegisterArtistsScreen};