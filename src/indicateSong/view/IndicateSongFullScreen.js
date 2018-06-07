import React from 'react';
import {StyleSheet, ScrollView, Text, View, TextInput, FlatList} from 'react-native';
import { Icon } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import { MPHeader, MPTextField, MPFooter, MPArtist, MPSong, MPGradientButton } from '../../components'
import { connect } from 'react-redux';

class IndicateSongFullScreenContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          textValue: '',
          songHeader: true,
          notFoundArtist: false,
        }

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
    <MPArtist artist={item.title} backgroundColor={item.backgroundColor} onPress={this.goToScreen.bind(this, 'IndicateSongFeedbackScreen')} style={{marginBottom: 10,}} />
  )

  toggleState = (att) => {
    this.setState({[att]: !this.state.songHeader});
  }

  checkArtistName = (value) => {
    this.setState({textValue: value});
    if(value == 'Madonna'){
      this.setState({notFoundArtist: true});
    }else{
      this.setState({notFoundArtist: false});
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={""} />
        <ScrollView>
        {
          this.props.fontLoaded ? (
            <View>
              { this.state.songHeader ? (
                <View>
                  <Text style={ styles.headerText}>Com quem <Text style={ styles.headerTextCustom }>combina</Text> ?</Text>
                  <MPSong />
                  <Text style={ styles.detailsText}>Sabe aquela história de que todo artista tem de ir aonde o povo está? Vamos mostrar sua criação para o mundo. Aproveite para convocar seus seguidores ou você mesmo pode achar uma banda perfeita para esse hit.</Text>
                </View>
              ) : null
              }
              <MPTextField label={'Encontre um artista'}
                 value={this.state.textValue}
                 style={{marginHorizontal: 20}}
                 onFocus={this.toggleState.bind(this, 'songHeader')}
                 onBlur={this.toggleState.bind(this, 'songHeader')}
                 onChangeText={ this.checkArtistName }/>
              {
                this.state.notFoundArtist ? (
                  <View>
                    <Text style={ styles.textFieldSubText}><Text style={ styles.textFieldSubTextEmph}>"Madonna"</Text> ainda não está no MusicPlayce.</Text>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoText}>Quando <Text style={styles.infoTextEmph}>Madonna</Text> fizer o cadastro, vamos mostrar sua indicação!</Text>
                      <MPGradientButton title={'Indicar'} textSize={16} style={{marginHorizontal: 113, marginTop: 10}} onPress={()=> {}} />
                    </View>
                  </View>
                ) : null
              }
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
    marginTop: 30
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
  },
  textFieldSubText: {
    fontSize: 12,
    color: '#686868',
    fontFamily: 'montSerratItalic',
    marginHorizontal: 20,
  },
  textFieldSubTextEmph: {
    fontFamily: 'montSerratBold',
    color: '#000'
  },
  infoTextContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  infoText: {
    fontSize: 20, 
    fontFamily: 'montSerrat',
    color: '#000',
    textAlign: 'center',
  },
  infoTextEmph: {
    fontFamily: 'montSerratBold'
  },
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const IndicateSongFullScreen = connect(mapStateToProps)(IndicateSongFullScreenContainer);
export {IndicateSongFullScreen};