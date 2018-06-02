import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements';
import { MPArtistHorizontal, MPHeader } from '../../components';
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

  renderItem = ({item}) => (
    <MPArtistHorizontal style={{marginStart: 20, marginEnd: 20}} artist={item.title} selected={item.selected} />
  )
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Co-autores"} />
        <ScrollView style={styles.scroll}>
            {   this.props.fontLoaded ? (
                <View>
                    <Text style={styles.textTop}>Essa música tem outros autores?</Text>
                    <View style={ styles.textFieldWithButtonContainer}>
                        <TextField label="Pesquisar por nome"
                        value="Almir Sater"
                        labelFontSize={16} 
                        lineWidth={1}
                        containerStyle={{flex: 1}}
                        labelTextStyle={{ fontFamily: 'montSerrat' }}
                        titleTextStyle={{ fontFamily: 'montSerrat' }}
                        style={{}}/>
                        <Icon name='search' color='#e13223' size={20} containerStyle={ styles.textFieldIcon }/>
                    </View>
                </View>
                ) : null
            }
            <FlatList data = {this.artistList.data}
                    keyExtractor={(item,index) => item.id} 
                    renderItem={this.renderItem} />
        </ScrollView>
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
    height: 20,
    marginBottom: 20,
    marginTop: 30,
    marginStart: 40,
    fontFamily: 'montSerrat',
  },
  textFieldWithButtonContainer: {
    flexDirection: 'row',
    padding: 0,
    marginBottom: 30,
    paddingStart :40,
    paddingEnd: 40,
},
textFieldIcon: {
    alignSelf: 'flex-end',
    paddingBottom: 16,
}
});

const mapStateToProps = ({ fontReducer }) => {
    return { ...fontReducer };
  };
  
const ListArtistsScreen = connect(mapStateToProps)(ListArtistsScreenContainer);
export {ListArtistsScreen};