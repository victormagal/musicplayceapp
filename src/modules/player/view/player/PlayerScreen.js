import React from 'react';
import {connect} from 'react-redux';
import {
  View, StyleSheet
} from 'react-native';
import {MPButton} from '../../../../components';
import {PlayerComponent} from './PlayerComponent';
import {
  playerSongSaveReceived, songStop, songPlay,
  songPause, songResume, fetchOneSong, getArtistsSongs
} from '../../../../state/action';
import {
  MPHeartRedIcon
} from '../../../../assets/svg';


class PlayerContainer extends React.Component {

  state = {
    song : null,
    artistNames: [],
    artistsSongs: []
  };

  componentDidMount(){
    if(this.props.navigation.state && this.props.navigation.state.params){
      let {song} = this.props.navigation.state.params;
      if(song) {
        this.props.dispatch(fetchOneSong(song));
      }
    }
  }

  getArtistsList = (song) => {
    let artistNames = [song.artist.name];
    let artistList = [song.artist.id];
    if(song.coAuthors && song.coAuthors.length > 0){
      let coAuthors = song.coAuthors;
      coAuthors.map((coAuthor) => {
        artistList.push(coAuthor.id);
        artistNames.push(coAuthor.name);
      })
    }
    this.setState({artistNames});
    return artistList;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.saveSong.update){
      let timer = setTimeout(() => {
        this.props.dispatch(playerSongSaveReceived());
        clearTimeout(timer);
      }, 2000);
    }

    if(nextProps.song){
      nextProps.song.artist = this.props.navigation.state.params.song.artist;
      if(this.state.song !== nextProps.song){
        this.props.dispatch(getArtistsSongs(this.getArtistsList(nextProps.song)));
      }
      this.setState({song: nextProps.song});
    }

    if(nextProps.artistSongs){
      let arraySongs = nextProps.artistSongs.map(songs => {
        return songs.data;
      });
      if(arraySongs.length > 0){
        this.setState({artistsSongs: arraySongs});
      }
    }
  }

  componentWillUnmount(){
    this.props.dispatch(songStop());
  }

  handleSongPause = () => {
    this.props.dispatch(songPause());
  };

  handleSongPlay = (song) => {
    this.props.dispatch(songPlay(song));
  };

  handleSongResume = () => {
    this.props.dispatch(songResume());
  };

  handleSongSliderChange = (value) => {
    //TODO:
    //call action to seek music in react native plugin
  };

  render() {
    return (
      <View style={styles.container}>
        <PlayerComponent todo="REFACTOR" {...this.props}
                         song={this.state.song}
                         artistsSongs={this.state.artistsSongs}
                         artistNames={this.state.artistNames}
                         onSongPause={this.handleSongPause}
                         onSongResume={this.handleSongResume}
                         onSongPlay={this.handleSongPlay}
                         onSongSliderChange={this.handleSongSliderChange}/>
        {this.props.saveSong.update && (
          <MPButton
            style={styles.notificationSaved}
            textStyle={styles.notificationSavedText}
            title={"Salvo em " + this.props.saveSong.folder }
            onPress={() => {}} icon={MPHeartRedIcon}/>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  notificationSaved: {
    position: 'absolute',
    top: 75,
    width: '70%',
    marginLeft: '15%',
    borderRadius: 26,
    backgroundColor: '#fff'
  },
  notificationSavedText: {
    fontSize: 14,
    color: '#686868'
  }
});

const mapStateToProps = ({playerReducer, songsReducer}) => {
  return {...playerReducer, song: songsReducer.fetchedSong}
};

const PlayerScreen = connect(mapStateToProps)(PlayerContainer);
export {PlayerScreen};
