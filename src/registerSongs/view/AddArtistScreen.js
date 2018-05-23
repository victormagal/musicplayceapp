import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList} from 'react-native';
import { Icon } from 'react-native-elements'

class AddArtistScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
        text: "Pesquise pelo nome",
        item: {
            selected: true,
            backgroundColor: '#f05',
            title: 'Almir Sater'
        }
    };
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View>
            <View style={ [styles.stretchedArtistCardContainer, this.state.item.selected == true ? {borderWidth:2, borderColor: '#e13223'} : {}] }>
                <View style={ styles.stretchedArtistImage } backgroundColor={ this.state.item.backgroundColor}></View>
                <Text style={ styles.stretchedArtistText}>{ this.state.item.title }</Text>
            </View>
            <Icon name='check-circle' color='#f00' size={18} containerStyle={ this.state.item.selected == true ? styles.stretchedArtistSelectedIcon : { display: 'none'}}/>
        </View>
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
  stretchedArtistCardContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.9,
    shadowRadius: 4,
    height: 60,
    marginBottom: 20,
    overflow: 'hidden'
  },
  stretchedArtistImage: {
    width: 60,
    height: 60,
  },
  stretchedArtistText: {
    color: "#000",
    paddingStart: 20,
    fontSize: 20,
  },
  stretchedArtistSelectedIcon: {
      position: 'absolute',
      right: 0,
      top: 0,
      overflow: 'visible'
  }
});

export {AddArtistScreen};