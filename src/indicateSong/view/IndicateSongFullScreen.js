import React from 'react';
import {StyleSheet, ScrollView, Text, View, TextInput, FlatList} from 'react-native';
import { Icon } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import { MPHeader, MPTextField, MPFooter, MPArtist, MPSong } from '../../components'
import { connect } from 'react-redux';

class IndicateSongFullScreenContainer extends React.Component {
    constructor(props){
        super(props);

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

                {
                    id: '02',
                    title: 'Sergio Reis',
                    backgroundColor: '#c30'
                },

                {
                    id: '02',
                    title: 'Munhoz & Mariano',
                    backgroundColor: '#03c'
                },

                {
                    id: '02',
                    title: 'Samuel Rosa',
                    backgroundColor: '#0c3'
                },
            ]
        }
    }
  handleBackClick = () => {
    this.props.navigation.pop();
  };

  goToScreen = (route) => {
    this.props.navigation.navigate(route);
  }
  
  renderItem = ({item}) => (
    <MPArtist artist={item.title} backgroundColor={item.backgroundColor} onPress={() => {}} style={{marginBottom: 10,}} />
  )

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={""} />
        <ScrollView>
        {
          this.props.fontLoaded ? (
            <View>
              <Text style={ styles.headerText}>Com quem <Text style={ styles.headerTextCustom }>combina</Text> ?</Text>
              <MPSong />
              <Text style={ styles.detailsText} onPress={this.goToScreen.bind(this, 'IndicateSongNotFoundScreen')}>Sabe aquela história de que todo artista tem de ir aonde o povo está? Vamos mostrar sua criação para o mundo. Aproveite para convocar seus seguidores ou você mesmo pode achar uma banda perfeita para esse hit.</Text>
              <MPTextField label={'Encontre um artista'} value={''} style={{marginHorizontal: 20}}/>
              <View>
                  <FlatList data = {this.artistList.data}
                      keyExtractor={(item,index) => item.id} 
                      renderItem={this.renderItem}
                      numColumns={3}
                      columnWrapperStyle={{marginTop: 20,flexWrap: 'wrap', justifyContent: 'center'}}/>
              </View>
            </View>
          ) : null
        }
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
  headerText: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'montSerrat',
    marginHorizontal: 20,
  },
  headerTextCustom: {
      fontFamily: 'montSerratBold',
      color: '#e13223',
  },
  detailsText: {
      fontSize: 16,
      color: "#686868",
      marginHorizontal: 20,
      fontFamily: 'montSerrat',
      flexWrap: 'wrap',
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const IndicateSongFullScreen = connect(mapStateToProps)(IndicateSongFullScreenContainer);
export {IndicateSongFullScreen};