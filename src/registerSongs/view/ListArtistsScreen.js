import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList} from 'react-native';
import { Icon } from 'react-native-elements'

class ListArtistsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: "Almir Sater"};

    this.artistList = {
        data: [
            {
                id: '00',
                backgroundColor: '#a78759',
                title: 'Paula Fernandes'
            },
            {
                id: '01',
                backgroundColor: '#ff6347',
                title: 'Almir Sater',
                selected: true,
            },
            {
                id: '02',
                backgroundColor: '#ffff33',
                title: 'Sérgio Reis'
            },
            {
                id: '03',
                backgroundColor: '#90ee90',
                title: 'Munhoz & Mariano'
            },
            {
                id: '04',
                backgroundColor: '#add8e6',
                title: 'Samuel Rosa'
            },
            {
                id: '05',
                backgroundColor: '#a9a9a9',
                title: 'David Burn'
            },
            {
                id: '06',
                backgroundColor: '#ff69b4',
                title: 'Bjork'
            },
            {
                id: '07',
                backgroundColor: '#ffdf00',
                title: 'Daft Punk'
            },
            {
                id: '08',
                backgroundColor: '#228b22',
                title: 'Gabriel o Pensador'
            },
            {
                id: '09',
                backgroundColor: '#d3d3d3',
                title: 'Stone Roses'
            },
            {
                id: '10',
                backgroundColor: '#f00',
                title: 'Kraftwerk'
            },
        ]
    }
  }

  renderItem = ({item}) => (
    <View>
        <View style={ [styles.stretchedArtistCardContainer, item.selected == true ? {borderWidth:2, borderColor: '#e13223'} : {}] }>
            <View style={ styles.stretchedArtistImage } backgroundColor={ item.backgroundColor}></View>
            <Text style={ styles.stretchedArtistText}>{ item.title }</Text>
        </View>
        <Icon name='check-circle' color='#f00' size={18} containerStyle={ item.selected == true ? styles.stretchedArtistSelectedIcon : { display: 'none'}}/>
    </View>
  )
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTop}>Essa música tem outros autores?</Text>
        <View style={ styles.textInputContainer}>
          <TextInput style={styles.textInput}
            onFocus={ () => this.setState({text: ""})}
            onChangeText={ (text) => this.setState({text}) }
            value={this.state.text}
            underlineColorAndroid='transparent'/>
          <Icon name='search' color='#e13223' size={16}/>
        </View>
        <FlatList data = {this.artistList.data}
                keyExtractor={(item,index) => item.id} 
                renderItem={this.renderItem} />
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
    flex: 1,
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
    marginBottom: 10,
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

export {ListArtistsScreen};