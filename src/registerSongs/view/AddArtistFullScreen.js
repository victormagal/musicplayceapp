import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList} from 'react-native';
import { Icon } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import { ArtistCardCE } from '../../components';

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
        <ArtistCardCE artist={"Almir Sater"} selected={true} />
        <View style={ styles.stretchedArtistCardContainer }>
            <View style={ [styles.stretchedArtistCardInnerContainer, this.state.emailItem.selected == true ? {borderWidth:2, borderColor: '#e13223'} : {}] }>
                <View>
                    <Text style={ styles.stretchedArtistText}>{ this.state.emailItem.title }</Text>
                    <Text style={ styles.stretchedArtistEmail}>{ this.state.emailItem.email }</Text>
                </View>
                <Icon type='material-community' name='email-outline' color='#5994db' size={20} containerStyle={ styles.emailArtistIcon }/>
            </View>
            <Text style={ styles.stretchedArtistConfirmationText }>Convite Enviado</Text>
            <Icon name='check-circle' color='#f00' size={18} containerStyle={ this.state.emailItem.selected == true ? styles.stretchedArtistSelectedIcon : { display: 'none'}}/>
        </View>
        <Text style={styles.textTop}>Essa música tem outros autores?</Text>
        <View style={ styles.textFieldWithButtonContainer}>
            <TextField label="Pesquisar por nome"
            value="Almir Sater"
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
  stretchedArtistCardContainer: {
    flexDirection: 'column',
    backgroundColor: '#e13223',
    borderWidth: 1,
    borderColor: '#e13223',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.9,
    shadowRadius: 4,
    marginBottom: 10,
  },
  stretchedArtistCardInnerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 60,
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
  stretchedArtistConfirmationText: {
    color: '#fff',
    fontWeight: 'bold',
    paddingStart: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  stretchedArtistEmail:{
    color: '#5994db',
    paddingStart: 20,
    fontSize: 14,
  },
  emailArtistIcon: {
      start: 0,
      paddingEnd: 20,
      alignItems: 'flex-end',
      flex: 1,
  },
  stretchedArtistSelectedIcon: {
      position: 'absolute',
      right: 0,
      top: 0,
      overflow: 'visible'
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

export {AddArtistFullScreen};