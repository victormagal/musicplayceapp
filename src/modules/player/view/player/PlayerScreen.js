import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { MPButton, MPFloatingNotification } from '../../../../components';
import {PlayerComponent} from './PlayerComponent';
import {
  playerSongSaveReceived,
  songStop,
  songPlay,
  songPause,
  songResume,
  songSeekTo,
  fetchOneSong,
  getUsersSongs,
  likeSongComment,
  unFavoriteSong,
} from '../../../../state/action';
import {songNotificationRemove} from '../../../../state/songs/songsType';
import { MPHeartRedIcon } from '../../../../assets/svg';


class PlayerContainer extends React.Component {
  songTimer = null;
  state = {
    song : null,
    userNames: [],
    usersSongs: []
  };

  componentDidMount(){
    const { navigation, dispatch } = this.props;
    if (navigation.state && navigation.state.params) {
      const { song } = navigation.state.params;
      if (song) {
        dispatch(fetchOneSong(song));
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.saveSong.update) {
      const timer = setTimeout(() => {
        this.props.dispatch(playerSongSaveReceived());
        clearTimeout(timer);
      }, 2000);
    }

    if (nextProps.userSongs){
      const usersSongs = nextProps.userSongs.map(songs => songs.data);
      if (usersSongs.length > 0) {
        this.setState({ usersSongs });
      }
    }

    if(nextProps.songUnfavoriteSuccess || nextProps.songFavoriteSuccess){
      this.songTimer = setTimeout(() => {
        this.props.dispatch(songNotificationRemove());
        clearTimeout(this.songTimer);
      }, 8000);
    }
  }

  componentWillUnmount(){
    this.props.dispatch(songStop());

    if(this.songTimer){
      clearTimeout(this.songTimer);
    }
  }

  getUsersList = (song) => {
    console.log('song', song);
    const userNames = [ song.artist.name ];
    const userList = [ song.artist.id ];
    if (song.coAuthors && song.coAuthors.length > 0) {
      const coAuthors = song.coAuthors;
      coAuthors.map((coAuthor) => {
        userList.push(coAuthor.id);
        userNames.push(coAuthor.name);
      });
    }
    this.setState({ userNames });
    return userList;
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
    //TODO: call action to seek music in react native plugin
    this.props.dispatch(songSeekTo(value));
  };

  handleLikeComment = (commentId) => {
    this.props.dispatch(likeSongComment(commentId));
  };

  handleSongUnfavorite = (songId) => {
    this.props.dispatch(unFavoriteSong(songId));
  };

  render() {
    const {usersSongs, userNames } = this.state;
    let newProps = {...this.props};

    if(newProps.song && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.song) {
      newProps.song.artist = this.props.navigation.state.params.song.artist;
    }

    return (
      <View style={styles.container}>
        <PlayerComponent
          todo="REFACTOR"
          {...newProps}
          usersSongs={usersSongs}
          userNames={userNames}
          onSongUnfavorite={this.handleSongUnfavorite}
          onSongPause={this.handleSongPause}
          onSongResume={this.handleSongResume}
          onSongPlay={this.handleSongPlay}
          onSongSliderChange={this.handleSongSliderChange}
          onLikeComment={this.handleLikeComment}
        />

        <MPFloatingNotification visible={this.props.songFavoriteSuccess} text={"Salvo em " + (newProps.song && newProps.song.folder) }
          icon={<MPHeartRedIcon />}/>
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

const mapStateToProps = ({ playerReducer, songsReducer }) => {
  let {songUnfavoriteSuccess, songFavoriteSuccess, fetchedSong} = songsReducer;
  return { ...playerReducer, song: fetchedSong, songUnfavoriteSuccess, songFavoriteSuccess};
};

const PlayerScreen = connect(mapStateToProps)(PlayerContainer);
export { PlayerScreen };
