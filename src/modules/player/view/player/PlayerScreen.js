import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {MPFloatingNotification} from '../../../../components';
import {PlayerComponent} from './PlayerComponent';
import {
  songStop, songPlay, songPause, songResume, songSeekTo,
  fetchOneSong, getUsersSongs, likeSongComment, unFavoriteSong
} from '../../../../state/action';
import {songNotificationRemove} from '../../../../state/songs/songsType';
import {MPHeartRedIcon} from '../../../../assets/svg';


class PlayerContainer extends React.Component {
  songTimer = null;
  state = {
    coAuthors: [],
    artist: null
  };

  componentDidMount() {
    const {navigation} = this.props;
    if (navigation.state && navigation.state.params) {
      const {song} = navigation.state.params;
      if (song) {
        song.artist = this.props.navigation.state.params.song.artist;
        this.handleSetupPlay(song);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.songUnfavoriteSuccess || nextProps.songFavoriteSuccess) {
      this.songTimer = setTimeout(() => {
        this.props.dispatch(songNotificationRemove());
        clearTimeout(this.songTimer);
      }, 4000);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(songStop());

    if (this.songTimer) {
      clearTimeout(this.songTimer);
    }
  }

  getUsersList = (song) => {
    if (!song) {
      return [];
    }
    let users = [song.artist];

    if (song.coAuthors && song.coAuthors.length > 0) {
      const coAuthors = song.coAuthors;
      users = users.concat(coAuthors);
    }
    return users;
  };

  handleSetupPlay = (song) => {
    if (this.props.song && this.props.song.id === song.id) {
      return;
    }

    this.props.dispatch(songStop()).then(_ => {
      this.setState({artist: song.artist});

      this.props.dispatch(fetchOneSong(song)).then(s => {
        s.artist = song.artist;
        let coAuthors = this.getUsersList(s);
        this.setState({coAuthors});
        this.props.dispatch(getUsersSongs(coAuthors));
      });
    });
  };

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
    this.props.dispatch(songSeekTo(value));
  };

  handleLikeComment = (commentId) => {
    console.log('comentou', commentId);
    this.props.dispatch(likeSongComment(commentId));
  };

  handleSongUnfavorite = (songId) => {
    this.props.dispatch(unFavoriteSong(songId));
  };

  render() {
    let newProps = {...this.props};
    if (newProps.song && !newProps.song.artist && this.state.artist) {
      newProps.song.artist = this.state.artist;
    }

    return (
      <View style={styles.container}>
        <PlayerComponent
          {...newProps}
          coAuthors={this.state.coAuthors}
          onPlayClick={this.handleSetupPlay}
          onSongUnfavorite={this.handleSongUnfavorite}
          onSongPause={this.handleSongPause}
          onSongResume={this.handleSongResume}
          onSongPlay={this.handleSongPlay}
          onSongSliderChange={this.handleSongSliderChange}
          onLikeComment={this.handleLikeComment}/>

        <MPFloatingNotification visible={this.props.songFavoriteSuccess}
                                text={"Salvo em " + (newProps.song && newProps.song.folder) }
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

const mapStateToProps = ({playerReducer, songsReducer}) => {
  let {songUnfavoriteSuccess, songFavoriteSuccess, fetchedSong} = songsReducer;
  return {...playerReducer, song: fetchedSong, songUnfavoriteSuccess, songFavoriteSuccess};
};

const PlayerScreen = connect(mapStateToProps)(PlayerContainer);
export {PlayerScreen};
