import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { MPButton } from '../../../../components';
import {PlayerComponent} from './PlayerComponent';
import {
  playerSongSaveReceived,
  songStop,
  songPlay,
  songPause,
  songResume,
  fetchOneSong,
  getUsersSongs,
  likeSongComment
} from '../../../../state/action';
import { MPHeartRedIcon } from '../../../../assets/svg';


class PlayerContainer extends React.Component {
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

  componentWillReceiveProps(nextProps){
    const { navigation, dispatch } = this.props;
    const { song } = this.state;

    if (nextProps.saveSong.update) {
      const timer = setTimeout(() => {
        this.props.dispatch(playerSongSaveReceived());
        clearTimeout(timer);
      }, 2000);
    }

    if (nextProps.song){
      nextProps.song.artist = navigation.state.params.song.artist;
      if (song !== nextProps.song){
        dispatch(getUsersSongs(this.getUsersList(nextProps.song)));
      }
      this.setState({ song: nextProps.song });
    }

    if (nextProps.userSongs){
      const usersSongs = nextProps.userSongs.map(songs => songs.data);
      if (usersSongs.length > 0) {
        this.setState({ usersSongs });
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
    //TODO: call action to seek music in react native plugin
  };

  handleLikeComment = (commentId) => {
    this.props.dispatch(likeSongComment(commentId));
  }

  render() {
    const { saveSong } = this.props;
    const { song, usersSongs, userNames } = this.state;
    return (
      <View style={styles.container}>
        <PlayerComponent
          todo="REFACTOR" {...this.props}
          song={song}
          usersSongs={usersSongs}
          userNames={userNames}
          onSongPause={this.handleSongPause}
          onSongResume={this.handleSongResume}
          onSongPlay={this.handleSongPlay}
          onSongSliderChange={this.handleSongSliderChange}
          onLikeComment={this.handleLikeComment}
        />
        { saveSong.update &&
          <MPButton
            style={styles.notificationSaved}
            textStyle={styles.notificationSavedText}
            title={"Salvo em " + saveSong.folder }
            onPress={() => console.log()}
            icon={MPHeartRedIcon}
          />
        }
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
  return { ...playerReducer, song: songsReducer.fetchedSong }
};

const PlayerScreen = connect(mapStateToProps)(PlayerContainer);
export { PlayerScreen };
