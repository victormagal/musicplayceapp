import React from 'react';
import {connect} from 'react-redux';
import {
  View, StyleSheet
} from 'react-native';
import {MPButton} from '../../../../components';
import {PlayerComponent} from './PlayerComponent';
import {playerSongSaveReceived, songStop, fetchOneSong} from '../../../../state/action';
import {
  MPHeartRedIcon
} from '../../../../assets/svg';


class PlayerContainer extends React.Component {

  state = {
    song : null
  };

  componentDidMount(){
    if(this.props.navigation.state && this.props.navigation.state.params){
      let {song} = this.props.navigation.state.params;
      if(song) {
        this.props.dispatch(fetchOneSong(song));
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.saveSong.update){
      let timer = setTimeout(() => {
        this.props.dispatch(playerSongSaveReceived());
        clearTimeout(timer);
      }, 2000);
    }

    if(nextProps.song){
      this.setState({song: nextProps.song});
    }
  }

  componentWillUnmount(){
    this.props.dispatch(songStop());
  }

  render() {
    return (
      <View style={styles.container}>
        <PlayerComponent todo="REFACTOR" {...this.props} song={this.state.song} />
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
