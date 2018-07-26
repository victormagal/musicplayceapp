import React from 'react';
import {connect} from 'react-redux';
import {PlayerSaveSongComponent} from './PlayerSaveSongComponent';
import { fetchFolders, favoriteSong} from '../../../../state/action';


class PlayerSaveSongContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      folderName: '',
      folders: [],
      song: {},
      songFavoriteSuccess: false,
    };
  }

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleAdd = () => {
    if(this.state.folderName){
      let newState = {...this.state};
      newState.folderName = '';
      newState.folders.push({
        id: newState.folders.length,
        title: this.state.folderName,
        total: 'Nenhuma música'
      });
      this.setState(newState);
    }
  };

  handleChangeText = (value) => {
    this.setState({folderName: value});
  };

  handleSelectFolder = (index) => {
    let newState = {...this.state};

    for(let i in newState.folders){
      newState.folders[i].selected = false;
    }

    newState.folders[index].selected = true;
    this.setState(newState);
  };

  handleSave = () => {
    // let selectedFolder = this.state.folders.filter(i => i.selected)[0];
    this.props.dispatch(favoriteSong(this.state.song.id));
  };

  componentDidMount = () => {
    this.props.dispatch(fetchFolders());
    if(this.props.navigation.state && this.props.navigation.state.params){
      let {song} = this.props.navigation.state.params;
      if(song) {
        this.setState({song});
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.folders){
      this.setState({folders: nextProps.folders.data})
    }

    if(nextProps.songFavoriteSuccess){
      this.handleBack();
    }
  }

  render() {
    return (
      <PlayerSaveSongComponent
        folders={this.state.folders}
        folderName={this.state.folderName}
        onBack={this.handleBack}
        onSave={this.handleSave}
        onSelectFolder={this.handleSelectFolder}
        onChangeText={this.handleChangeText}
        onAddFolder={this.handleAdd}
        loading={this.props.loading}/>
    );
  }
}

const mapStateToProps = ({folderReducer, songsReducer}) => {
  return {...folderReducer, ...songsReducer};
};

const PlayerSaveSongScreen = connect(mapStateToProps)(PlayerSaveSongContainer);
export {PlayerSaveSongScreen};
