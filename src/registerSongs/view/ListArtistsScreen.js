import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements';
import { MPArtistHorizontal, MPHeader, MPFooter, MPTextField } from '../../components';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';

class ListArtistsScreenContainer extends React.Component {
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

  goToScreen = (route) => {
    this.props.navigation.navigate(route);
  }

  handleBackClick = () => {

    this.props.navigation.pop();
  };

  renderItem = ({item}) => (
    <MPArtistHorizontal 
        artist={item.title} 
        selected={item.selected}
        onPress={ this.goToScreen.bind(this,'AddArtistScreen') } />
  )
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Co-autores"} />
        <ScrollView style={styles.scroll}>
            {   this.props.fontLoaded ? (
                <View style={{marginBottom: 30}}>
                    <Text style={styles.textTop}>Essa música tem outros autores?</Text>
                    <MPTextField label={'Pesquise pelo nome:'} value={'Almir Sater'} />
                </View>
                ) : null
            }
            <FlatList data = {this.artistList.data}
                    keyExtractor={(item,index) => item.id} 
                    renderItem={this.renderItem} />
        </ScrollView>
        <MPFooter />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FCFCFC',
    justifyContent: 'flex-end'
  },
  scroll: {
      flex: 2,
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    marginHorizontal: 40,
    fontFamily: 'montSerrat',
  }
});

const mapStateToProps = ({ fontReducer }) => {
    return { ...fontReducer };
  };
  
const ListArtistsScreen = connect(mapStateToProps)(ListArtistsScreenContainer);
export {ListArtistsScreen};