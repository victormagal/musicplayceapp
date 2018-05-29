import React from 'react';
import {StyleSheet, Text, View, TextInput, Image, FlatList} from 'react-native';
import { ButtonCE } from '../../components';

class ConfirmationScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: "Pesquise pelo nome"};

    this.artistList = {
        data: [
            {
                id: '00',
                title: 'David Burn',
                backgroundColor: '#6f0'
            },
            {
                id: '01',
                title: 'Bjork',
                backgroundColor: '#f60'
            },
            {
                id: '02',
                title: 'Daft Punk',
                backgroundColor: '#06f'
            },
        ]
    }
  }

  renderItem = ({item}) => (
    <View style={ styles.simpleArtistCardContainer }>
        <View style={ styles.simpleArtistCardImage } backgroundColor={ item.backgroundColor }></View>
        <Text style={ styles.simpleArtistCardText }>{ item.title }</Text>
    </View>
  )
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Pronto! Tudo certo.</Text>
        <Text style={styles.subTitleText}>Que tal indicar sua música pra uma banda que você goste?</Text>
        <View style={{height: 152}}>
            <FlatList data = {this.artistList.data}
                keyExtractor={(item,index) => item.id} 
                renderItem={this.renderItem}
                numColumns={3}
                columnWrapperStyle={{flexWrap: 'wrap', justifyContent: 'center'}}/>
        </View>
        <View style={ styles.confirmationButtonsContainer }>
            <ButtonCE title={"Convidar para o MusicPlayce"} onPress={() => {}} style={ styles.confirmationButtonTop } textSize={16} />
            <ButtonCE title={"Fechar"} onPress={() => {}} style={ styles.confirmationButtonBottom } textSize={16} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 74,
    marginBottom: 20,
    marginStart: 20,
    marginEnd: 20,
    flexDirection: 'column'
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    height: 22,
    color: '#000',
    marginBottom: 10,
    paddingStart: 64,
    paddingEnd: 64
  },
  subTitleText: {
    fontSize: 16,
    textAlign: 'center',
    alignContent: 'center',
    fontWeight: 'normal',
    height: 40,
    color: '#000',
    marginBottom: 20,
    paddingStart: 45,
    paddingEnd: 45
  },
  simpleArtistCardContainer: {
    width: 100,
    height: 152,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 4,
    marginEnd: 10
  },
  simpleArtistCardImage:{
    width: 100,
    height: 100,
    borderRadius: 4,
    backgroundColor: '#f60'
  },
  simpleArtistCardText: {
    fontSize: 14,
    color: '#000',
    paddingTop: 10,
    paddingStart: 10,
    paddingEnd: 10,
    paddingBottom: 26
  },
  confirmationButtonsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'stretch',
    marginTop: 30,
    marginStart: 40,
    marginEnd: 40
  },
  confirmationButtonTop: {
    marginBottom: 20
  },
  confirmationButtonBottom: {
    marginStart: 73,
    marginEnd: 73
  }
});

export {ConfirmationScreen};