import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList} from 'react-native';
import { Icon } from 'react-native-elements';
import { ArtistCardCE } from '../../components';
import { TextField } from 'react-native-material-textfield';

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
    marginBottom: 30
},
textFieldIcon: {
    alignSelf: 'flex-end',
    paddingBottom: 16,
}
  
});

export {AddArtistScreen};