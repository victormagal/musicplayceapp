import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList} from 'react-native';
import { Icon } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import { MPArtistHorizontal } from '../../components';

class AddArtistByEmailScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
        text: "Roberto Carlos",
        emailText: "robertocarlos@gmail.com",
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
        <MPArtistHorizontal artist={"Almir Sater"} selected={true} />
        <Text style={styles.textTop}>Essa música tem outros autores?</Text>
        <View style={ styles.textFieldWithButtonContainer}>
            <TextField label="Pesquisar por nome"
            value="Roberto Carlos"
            labelFontSize={16} 
            lineWidth={1}
            baseColor={"#b1b1b1"}
            containerStyle={{flex: 1}}/>
            <Icon name='search' color='#e13223' size={20} containerStyle={ styles.textFieldIcon }/>
        </View>
        <View style={ styles.textInputSubTextContainer}>
            <Text style={ styles.textInputSubTextHeader}>Não encontrou o co-autor?</Text>
            <Text style={ styles.textInputSubTextSuggestion}>Convide-o para se juntar ao MusicPlayce.</Text>
        </View>
        <TextField 
        label='E-mail'
        value={this.state.emailText}
        labelFontSize={16}
        lineWidth={1}
        baseColor={'#b1b1b1'}
        onChangeText={(emailText) => this.setState({emailText})}/>
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
    marginBottom: 10    ,
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
  },
  textInputSubTextContainer: {
    
  },
  textInputSubTextHeader: {
    fontWeight: 'bold',
    color: '#686868',
    fontSize: 12
  },
  textInputSubTextSuggestion: {
    fontWeight: 'normal',
    fontSize: 12,
    color: '#686868',
  },
  textFieldWithButtonContainer: {
    flexDirection: 'row',
    padding: 0,
    marginBottom: 2
},
textFieldIcon: {
    alignSelf: 'flex-end',
    paddingBottom: 16,
}
});

export {AddArtistByEmailScreen};