import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList} from 'react-native';
import { Icon } from 'react-native-elements';
import { ArtistCardCE } from '../../components';

class AddArtistScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
        text: "Pesquise pelo nome",
    };
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ArtistCardCE artist={"Almir Sater"} selected={true} onPress={ () => {}} />
        <Text style={styles.textTop}>Essa música tem outros autores?</Text>
        <View style={ styles.textInputContainer}>
          <TextInput style={styles.textInput}
            onFocus={ () => this.setState({text: ""})}
            onChangeText={ (text) => this.setState({text}) }
            value={this.state.text}
            underlineColorAndroid='transparent'/>
          <Icon name='search' color='#e13223' size={16}/>
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
    marginBottom: 30    ,
    borderBottomWidth: 1,
    borderColor: '#b1b1b1',
    padding: 5
  },
  textInput: {
    borderColor: 'transparent',
    flex: 9
  },
  
});

export {AddArtistScreen};