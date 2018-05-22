import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { Icon } from 'react-native-elements'

class RegisterArtistsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: "Pesquise pelo nome"};
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTop}>Essa música tem intérpretes?</Text>
        <View style={ styles.textInputContainer}>
          <TextInput style={styles.textInput}
            onFocus={ () => this.setState({text: ""})}
            onChangeText={ (text) => this.setState({text}) }
            value={this.state.text}
            underlineColorAndroid='transparent'/>
          <Icon name='search' color='#f00' size={18}/>
        </View>
        <View style={styles.clickableTextContainer}>
          <Text style={styles.clickableText}>Não, apenas eu</Text>
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
    height: 20,
    marginBottom: 20,
  },
  textInputContainer: {
    height: 46,
    flexDirection: 'row',
    marginBottom: 152,
    borderBottomWidth: 1,
    borderColor: '#b1b1b1',
    padding: 5
  },
  textInput: {
    borderColor: 'transparent',
    flex: 9
  },
  clickableTextContainer: {
    alignItems: 'center',
    height: 20
  },
  clickableText: {
    width: 100,
    borderBottomWidth: 1,
    borderColor: '#5994db',
    textAlign: 'center',
    color: '#5994db',
    fontSize: 14,
  }
});

export {RegisterArtistsScreen};