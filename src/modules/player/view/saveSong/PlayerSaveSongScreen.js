import React from 'react';
import {connect} from 'react-redux';
import {PlayerSaveSongComponent} from './PlayerSaveSongComponent';
import { favoriteSong, createFolder, getFavoriteSongsFolders} from '../../../../state/action';


class PlayerSaveSongContainer extends React.Component {

  state = {
    folderName: '',
    folders: [],
    song: {},
    songFavoriteSuccess: false,
  };

  componentDidMount(){
    this.props.dispatch(getFavoriteSongsFolders());
    if(this.props.navigation.state && this.props.navigation.state.params){
      let {song} = this.props.navigation.state.params;
      if(song) {
        this.setState({song: song});
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.favoritesFolder){
      if (nextProps.favoritesFolder && nextProps.favoritesFolder.data && nextProps.favoritesFolder.data.length !== this.state.folders.length) {
        this.setState({folders: nextProps.favoritesFolder.data});
      }
    }

    if(nextProps.songFavoriteSuccess){
      this.handleBack();
    }
  }

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleAdd = () => {
    if(this.state.folderName){
      let folder = {
        'name': this.state.folderName,
        'type': 'favoriteSongs',
      };
      this.props.dispatch(createFolder(folder));
    }
  };

  handleChangeText = ({value}) => {
    this.setState({folderName: value});
  };

  handleSelectFolder = (index) => {
    let folders = Object.assign([], this.state.folders);


    for(let i in folders){
      folders[i].selected = false;
    }

    folders[index].selected = true;
    this.setState({folders});
  };

  handleSave = () => {
    let selectedFolder = this.state.folders.filter(i => i.selected)[0];
    this.props.dispatch(favoriteSong(this.state.song, selectedFolder));
  };

  handleFolderPagination = () => {
    if(this.state.folders.length > 0 &&
       this.props.favoritesFolder.pagination.current_page < this.props.favoritesFolder.pagination.total_pages){
      this.props.dispatch(getFavoriteSongsFolders(this.props.favoritesFolder.pagination.current_page + 1));
    }
  };


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
        onEndReached={this.handleFolderPagination}
        loading={this.props.loading}/>
    );
  }
}

const mapStateToProps = ({folderReducer, songsReducer}) => {
  return {...folderReducer, ...songsReducer};
};

const PlayerSaveSongScreen = connect(mapStateToProps)(PlayerSaveSongContainer);
export {PlayerSaveSongScreen};
