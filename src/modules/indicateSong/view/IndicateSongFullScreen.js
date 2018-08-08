import React from 'react';
import {StyleSheet, ScrollView, View, TextInput, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {MPHeader, MPTextField, MPUser, MPSong, MPGradientButton, MPText, MPLoading} from '../../../components'
import {searchUsers, fetchOneSong, indicateSong} from '../../../state/action';

class IndicateSongFullScreenContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      textValue: '',
      songHeader: true,
      notFoundUser: false,
      songIndicateSuccess: false,
      artists: [],
      indication: {
        song: {},
        artist: {},
      }
    };
  }

  componentDidMount(){
    this.props.dispatch(searchUsers(''));
    if(this.props.navigation.state && this.props.navigation.state.params){
      let {song} = this.props.navigation.state.params;
      this.setState({song: song});
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.users && nextProps.users.data.length > 0){
      console.log(nextProps.users);
      this.setState({artists: nextProps.users.data, notFoundUser: false});
    }else if(nextProps.users && nextProps.users.data.length == 0){
      this.setState({notFoundUser: true});
    }

    if(nextProps.songIndicateSuccess){
      this.goToScreen('IndicateSongFeedbackScreen')
    }
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleSongIndicate = ([artist, song]) => {
    this.setState({indication: {song, artist}});
    this.props.dispatch(indicateSong(song.id, artist.id));
  }

  goToScreen = () => {
    let artist = this.state.indication.artist;
    let song = this.state.indication.song;
    this.props.navigation.navigate('IndicateSongFeedbackScreen', {artist, song});
  };

  renderItem = ({item}) => (
    <MPUser artist={item}
              onPress={this.handleSongIndicate.bind(this, [item, this.state.song])} style={{marginBottom: 10}}/>
  );

  toggleState = (att) => {
    this.setState({[att]: !this.state.songHeader});
  };

  handleSearch = (value) => {
    this.setState({textValue: value});

    if(value == ""){
      this.props.dispatch(searchUsers(''));
      this.setState({notFoundUser: false});
    }

    if(value.length > 3){
      this.props.dispatch(searchUsers(value))
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick}/>
        <MPLoading visible={this.props.loading} />
        <ScrollView>
                <View>
                  { this.state.songHeader && this.state.song && (
                      <View>
                        <MPText style={ styles.headerText}>Com quem <MPText style={ styles.headerTextCustom }>combina</MPText>?</MPText>
                        <MPSong song={this.state.song}/>
                        <MPText style={ styles.detailsText}>Sabe aquela história de que todo artista tem de ir aonde o povo está? Vamos mostrar sua criação para o mundo. Aproveite para convocar seus seguidores ou você mesmo pode achar uma banda perfeita para esse hit.</MPText>
                      </View>
                  )}
                  <MPTextField label={'Encontre um artista'}
                               value={this.state.textValue}
                               style={{marginHorizontal: 20}}
                               onFocus={this.toggleState.bind(this, 'songHeader')}
                               onBlur={this.toggleState.bind(this, 'songHeader')}
                               onChangeText={ this.handleSearch }/>
                  {this.state.notFoundUser && (
                        <View>
                          <MPText style={ styles.textFieldSubText}><MPText style={ styles.textFieldSubTextEmph}>"{this.state.textValue}"</MPText>ainda não está no MusicPlayce.</MPText>
                          <View style={styles.infoTextContainer}>
                            <MPText style={styles.infoText}>Quando <MPText style={styles.infoTextEmph}>{this.state.textValue}</MPText>fizer o cadastro, vamos mostrar sua indicação!</MPText>
                            <MPGradientButton title={'Indicar'} textSize={16} style={{marginHorizontal: 113, marginTop: 10}} onPress={()=> {}} />
                          </View>
                        </View>
                  )}
                  <View>
                    <FlatList data = {this.state.artists}
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
});

const mapStateToProps = ({userReducer, songsReducer}) => {
  return {...userReducer, ...songsReducer};
};

const IndicateSongFullScreen = connect(mapStateToProps)(IndicateSongFullScreenContainer);
export {IndicateSongFullScreen};
