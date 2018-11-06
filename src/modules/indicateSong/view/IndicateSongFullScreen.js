import React from 'react';
import {StyleSheet, ScrollView, View, TextInput, FlatList, Share} from 'react-native';
import {connect} from 'react-redux';
import {MPHeader, MPTextField, MPUser, MPSong, MPGradientButton, MPText, MPLoading, MPIconButton} from '../../../components'
import {searchUsers, fetchOneSong, indicateSong} from '../../../state/action';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MPSearchRedIcon, MPCloseFilledRedIcon } from '../../../assets/svg';

class IndicateSongFullScreenContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      textValue: '',
      songHeader: true,
      notFoundUser: false,
      artists: [],
      indication: {
        song: {},
        artist: {},
      },
    };
  }

  componentDidMount() {
    this.props.dispatch(searchUsers(''));
    if (this.props.navigation.state && this.props.navigation.state.params) {
      let {song} = this.props.navigation.state.params;
      this.setState({song: song});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users && nextProps.users.data.length > 0) {
      this.setState({artists: nextProps.users.data, notFoundUser: false});
    } else if (nextProps.users && nextProps.users.data.length == 0) {
      this.setState({notFoundUser: true});
    }

    if (nextProps.songIndicateSuccess) {
      let {indicationCount} = nextProps;
      if(indicationCount){
        this.goToScreen(indicationCount - 1);
      }
    }
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleSongIndicate = ([artist, song]) => {
    let songId = song.id ? song.id : song.pivot.song_id;
    let artistId = artist.id ? artist.id : null
    this.setState({indication: {song, artist}});
    this.props.dispatch(indicateSong(songId, artistId));
  }

  goToScreen = (indicationCount) => {
    let artist = this.state.indication.artist;
    let song = this.state.indication.song;
    if(song.id && artist.id){
      this.props.navigation.navigate('IndicateSongFeedbackScreen', {artist, song, indicationCount});
    }
  };

  renderItem = ({item}) => (
    <MPUser user={item} onPress={this.handleSongIndicate.bind(this, [item, this.state.song])}/>
  );

  toggleState = (att) => {
    this.setState({[att]: !this.state.songHeader});
  };

  handleSearch = (value) => {
    this.setState({textValue: value});

    if (value == "") {
      this.props.dispatch(searchUsers(''));
      this.setState({notFoundUser: false, songHeader: true});
    }

    if (value.length > 3) {
      this.props.dispatch(searchUsers(value))
    }
  }

  handleClearClick = () => {
    this.handleSearch('');
  };

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick}/>
        <MPLoading visible={this.props.loading}/>
        <KeyboardAwareScrollView>
          <View>
            { this.state.songHeader && this.state.song && (
              <View>
                <MPText style={ styles.headerText}>Com quem <MPText style={ styles.headerTextCustom }>combina</MPText>?</MPText>
                <MPSong song={this.state.song}/>
                <MPText style={ styles.detailsText}>Sabe aquela história de que todo artista tem de ir aonde o povo está? Vamos mostrar sua criação para o mundo. Aproveite para convocar seus seguidores ou você mesmo pode achar uma banda perfeita para esse hit.</MPText>
              </View>
            )}
            <View style={{margin: 20}}>
              <MPTextField label={'Encontre um artista'}
                value={this.state.textValue}
                onFocus={this.toggleState.bind(this, 'songHeader')}
                onChangeText={ this.handleSearch }/>
              { this.state.textValue.length < 3 ?
                <MPSearchRedIcon style={styles.searchIcon}/>
                :
                <MPIconButton
                  style={styles.searchIcon}
                  icon={MPCloseFilledRedIcon}
                  onPress={this.handleClearClick}
                />
              }
            </View>
            {this.state.notFoundUser && (
              <View>
                <MPText style={ styles.textFieldSubText}><MPText style={ styles.textFieldSubTextEmph}>"{this.state.textValue} "</MPText> ainda não está no MusicPlayce.</MPText>
                <View style={styles.infoTextContainer}>
                  <MPText style={styles.infoText}>Enquanto isso, que tal convidar seus amigos para o MusicPlayce?</MPText>
                  <MPGradientButton title='Convidar' textSize={16} style={styles.indicateButton}
                    onPress={() => {
                       const link =  'https://www.musicplayce.com.br/';
                            
                        return Share.share({
                          title: 'MusicPlayce',
                          message: `Gostaria de te convidar a participar do MusicPlayce ${link}`,
                          dialogTitle: 'Convidar amigos'
                        });
                    }}/>
                </View>
              </View>
            )}
            <View>
              {this.state.notFoundUser && <MPText style={styles.artistsTitle}>Artistas e bandas em alta</MPText>}
              <FlatList
                style={{marginHorizontal: 10}}
                data={this.state.artists}
                keyExtractor={(item,index) => item.id}
                renderItem={this.renderItem}
                numColumns={3}
                columnWrapperStyle={{justifyContent: 'space-around'}}/>
            </View>
          </View>
        </KeyboardAwareScrollView>
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
    fontFamily: 'Montserrat-Regular',
    marginHorizontal: 20,
    marginTop: 30
  },
  headerTextCustom: {
    fontFamily: 'Montserrat-Bold',
    color: '#e13223',
  },
  detailsText: {
    fontSize: 16,
    color: "#686868",
    marginHorizontal: 20,
    fontFamily: 'Montserrat-Regular',
    flexWrap: 'wrap',
  },
  textFieldSubText: {
    fontSize: 12,
    color: '#686868',
    fontFamily: 'Montserrat-Italic',
    marginHorizontal: 20,
  },
  textFieldSubTextEmph: {
    fontFamily: 'Montserrat-Bold',
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
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    textAlign: 'center',
  },
  infoTextEmph: {
    fontFamily: 'Montserrat-Bold'
  },
  artistsTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    marginLeft: 20,
    marginTop: 30
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
    bottom: 15
  },
  indicateButton: {
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center'
  }
});

const mapStateToProps = ({userReducer, songsReducer}) => {
  return {...userReducer, ...songsReducer};
};

const IndicateSongFullScreen = connect(mapStateToProps)(IndicateSongFullScreenContainer);
export {IndicateSongFullScreen};
