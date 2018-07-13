import React from 'react';
import {StyleSheet, ScrollView, View, TextInput, FlatList} from 'react-native';
import {MPHeader, MPTextField, MPFooter, MPArtist, MPSong, MPGradientButton, MPText} from '../../../components'
import images from '../../../assets/img';

class IndicateSongFullScreen extends React.Component {

  state = {
    textValue: '',
    songHeader: true,
    notFoundArtist: false,
  };

  constructor(props) {
    super(props);

    this.artistList = {
      data: [
        {
          id: '00',
          title: 'David Burn',
          imagePath: images.daftPunk100
        },
        {
          id: '01',
          title: 'Bjork',
          imagePath: images.bjork100
        },
        {
          id: '02',
          title: 'Daft Punk',
          imagePath: images.daftPunk100
        },

        {
          id: '02',
          title: 'Sergio Reis',
          imagePath: images.bjork100
        },

        {
          id: '02',
          title: 'Munhoz & Mariano',
          imagePath: images.daftPunk100
        },

        {
          id: '02',
          title: 'Samuel Rosa',
          imagePath: images.bjork100
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
    <MPArtist artist={item.title} imagePath={item.imagePath}
              onPress={this.goToScreen.bind(this, 'IndicateSongFeedbackScreen')} style={{marginBottom: 10,}}/>
  )

  toggleState = (att) => {
    this.setState({[att]: !this.state.songHeader});
  }

  checkArtistName = (value) => {
    this.setState({textValue: value});
    if (value == 'Madonna') {
      this.setState({notFoundArtist: true});
    } else {
      this.setState({notFoundArtist: false});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick}/>
        <ScrollView>
                <View>
                  { this.state.songHeader && (
                      <View>
                        <MPText style={ styles.headerText}>Com quem <MPText style={ styles.headerTextCustom }>combina</MPText>?</MPText>
                        <MPSong />
                        <MPText style={ styles.detailsText}>Sabe aquela história de que todo artista tem de ir aonde o povo está? Vamos mostrar sua criação para o mundo. Aproveite para convocar seus seguidores ou você mesmo pode achar uma banda perfeita para esse hit.</MPText>
                      </View>
                  )}
                  <MPTextField label={'Encontre um artista'}
                               value={this.state.textValue}
                               style={{marginHorizontal: 20}}
                               onFocus={this.toggleState.bind(this, 'songHeader')}
                               onBlur={this.toggleState.bind(this, 'songHeader')}
                               onChangeText={ this.checkArtistName }/>
                  {this.state.notFoundArtist && (
                        <View>
                          <MPText style={ styles.textFieldSubText}><MPText style={ styles.textFieldSubTextEmph}>"Madonna"</MPText>ainda não está no MusicPlayce.</MPText>
                          <View style={styles.infoTextContainer}>
                            <MPText style={styles.infoText}>Quando <MPText style={styles.infoTextEmph}>Madonna</MPText>fizer o cadastro, vamos mostrar sua indicação!</MPText>
                            <MPGradientButton title={'Indicar'} textSize={16} style={{marginHorizontal: 113, marginTop: 10}} onPress={()=> {}} />
                          </View>
                        </View>
                  )}
                  <View>
                    <FlatList data = {this.artistList.data}
                              keyExtractor={(item,index) => item.id}
                              renderItem={this.renderItem}
                              numColumns={3}
                              columnWrapperStyle={{marginTop: 20,flexWrap: 'wrap', justifyContent: 'center'}}/>
                  </View>
                </View>
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

export {IndicateSongFullScreen};
