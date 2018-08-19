import React from 'react';
import {connect} from 'react-redux';
import { commentSong } from '../../../../state/action';
import { PlayerCommentSongComponent } from './PlayerCommentSongComponent';


class PlayerCommentSongScreenContainer extends React.Component {

  state = {
    commentText: '',
    song: null
  };

  componentDidMount(){
    if(this.props.navigation.state && this.props.navigation.state.params){
      let {song} = this.props.navigation.state.params;
      if(song) {
        this.setState({song: song});
      }
    }
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.songCommentedSuccess){
      this.props.navigation.pop();
    }
  }

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleSave = () => {
    let {song, commentText} = this.state;
      this.props.dispatch(commentSong(song.id, commentText));
  };

  handleChangeText = ({value}) => {
    this.setState({commentText: value});
  };

  render() {
    return (
      <PlayerCommentSongComponent
        commentText={this.state.commentText}
        onBack={this.handleBack}
        onSave={this.handleSave}
        onChangeText={this.handleChangeText}
        loading={this.props.loading}/>
    );
  }
}

const mapStateToProps = ({songsReducer}) => {
  return {...songsReducer};
};

const PlayerCommentSongScreen = connect(mapStateToProps)(PlayerCommentSongScreenContainer);
export {PlayerCommentSongScreen};
