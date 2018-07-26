import React from 'react';
import {connect} from 'react-redux';
import {PlayerSaveSongComponent} from './PlayerSaveSongComponent';
import {playerSongSave, fetchFolders} from '../../../../state/action';


class PlayerSaveSongContainer extends React.Component {

  state = {
    folderName: '',
    folders: []
  };

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
    let selectedFolder = this.state.folders.filter(i => i.selected)[0];
    this.handleBack();
    this.props.dispatch(playerSongSave(selectedFolder.title));
  };

  componentDidMount = () => {
    this.props.dispatch(fetchFolders());
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.folders){
      this.setState({folders: nextProps.folders.data})
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
        onAddFolder={this.handleAdd}/>
    );
  }
}

const mapStateToProps = ({folderReducer}) => {
  return {...folderReducer};
};

const PlayerSaveSongScreen = connect(mapStateToProps)(PlayerSaveSongContainer);
export {PlayerSaveSongScreen};
