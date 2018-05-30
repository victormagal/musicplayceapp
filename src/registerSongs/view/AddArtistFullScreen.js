import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList} from 'react-native';
import { Icon } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import { MPArtistHorizontal, MPInvitation } from '../../components';

class AddArtistFullScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
        text: "Pesquise pelo nome",
        item: {
            selected: true,
            backgroundColor: '#f05',
            title: 'Almir Sater'
        },
        emailItem: {
            selected: true,
            title: "Roberto Carlos",
            email: "robertocarlos@gmail.com"
        }
    };
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MPArtistHorizontal artist={"Almir Sater"} selected={true} />
        <MPInvitation artistName={"Roberto Carlos"} artistEmail={"robertocarlos@gmail.com"} selected={true} />
        <Text style={styles.textTop}>Essa música tem outros autores?</Text>
        <View style={ styles.textFieldWithButtonContainer}>
            <TextField label="Pesquisar por nome"
            value=""
            labelFontSize={16} 
            lineWidth={1}
            containerStyle={{flex: 1}}/>
            <Icon name='search' color='#e13223' size={20} containerStyle={ styles.textFieldIcon }/>
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
  textFieldWithButtonContainer: {
    flexDirection: 'row',
    padding: 0,
},
textFieldIcon: {
    alignSelf: 'flex-end',
    paddingBottom: 16,
}
});

export {AddArtistFullScreen};