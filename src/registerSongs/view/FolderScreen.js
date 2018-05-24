import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList} from 'react-native';
import { Icon, Button } from 'react-native-elements'
import { ButtonCE } from '../../components';
import { TextField } from 'react-native-material-textfield';

class FolderScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
        text: "Falando de amor",
        item: [
            {
                selected: true,
                title: 'Músicas pop',
                subTitle: '2 músicas'
            },
            {
                selected: false,
                title: 'Músicas de outrora',
                subTitle: '2 músicas'
            }
        ]
    };
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View>
            <View style={ [styles.stretchedArtistCardContainer, this.state.item[0].selected == true ? {borderWidth:2, borderColor: '#e13223'} : {}] }>
                <View style={ styles.stretchedArtistImage }>
                    <Icon type='font-awesome' name='folder-open-o' color='#5994db' />
                </View>
                <View style={ styles.stretchedArtistTextContainer }>
                    <Text style={ styles.stretchedArtistText}>{ this.state.item[0].title }</Text>
                    <Text style={ styles.stretchedArtistSubText}>{ this.state.item[0].subTitle }</Text>
                </View>
            </View>
            <Icon name='check-circle' color='#f00' size={18} containerStyle={ this.state.item[0].selected == true ? styles.stretchedArtistSelectedIcon : { display: 'none'}}/>
        </View>
        <View>
            <View style={ [styles.stretchedArtistCardContainer, this.state.item[1].selected == true ? {borderWidth:2, borderColor: '#e13223'} : {}] }>
                <View style={ styles.stretchedArtistImage }>
                    <Icon type='font-awesome' name='folder-open-o' color='#5994db' />
                </View>
                <View>
                    <Text style={ styles.stretchedArtistText}>{ this.state.item[1].title }</Text>
                    <Text style={ styles.stretchedArtistSubText}>{ this.state.item[1].subTitle }</Text>
                </View>
            </View>
            <Icon name='check-circle' color='#f00' size={18} containerStyle={ this.state.item[1].selected == true ? styles.stretchedArtistSelectedIcon : { display: 'none'}}/>
        </View>
        <View style={ styles.textFieldWithButtonContainer}>
            <TextField label="Nome da nova pasta"
            value="Falando de amor"
            labelFontSize={16} 
            lineWidth={0}
            containerStyle={{flex: 1}}/>
            <ButtonCE title='Criar' onPress={() => {}} />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  stretchedArtistText: {
    color: "#000",
    paddingStart: 20,
    fontSize: 20,
  },
  stretchedArtistSubText: {
    color: "#c0c0c0",
    paddingStart: 20,
    fontSize: 10,
  },
  stretchedArtistSelectedIcon: {
      position: 'absolute',
      right: 0,
      top: 0,
      overflow: 'visible'
  },
  textFieldWithButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderColor: "#b1b1b1",
      padding: 0
  }
});

export {FolderScreen};