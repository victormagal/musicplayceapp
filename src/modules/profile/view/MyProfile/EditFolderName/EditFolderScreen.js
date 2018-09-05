import React from 'react';
import { connect } from 'react-redux';
import { 
  updateFolderName
} from '../../../../../state/action';
import { EditFolderComponent } from './EditFolderComponent';

class EditFolderScreenContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      folderId: null,
      foldername: ''
    };
  }

  componentDidMount(){
    if(this.props.navigation.state && this.props.navigation.state.params){
      let {folder} = this.props.navigation.state.params;
      if(folder.id){
        this.setState({folderId: folder.id, foldername: folder.name});
      }
    }
  }

  handleSaveClick = (newName) => {
    this.props.dispatch(updateFolderName(this.state.folderId, newName));
    this.props.navigation.pop();
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleTextChange = (value) => {
    this.setState({foldername: value});
  };

  render() {
    return (
      <EditFolderComponent
        {...this.props}
        folder={this.state.foldername}
        onSave={this.handleSaveClick}
        onBack={this.handleBackClick}
        onFolderNameChange={this.handleTextChange}
      />
    );
  }
}

const mapStateToProps = ({ folderReducer }) => {
  return {...folderReducer };
};

const EditFolderScreen = connect(mapStateToProps)(EditFolderScreenContainer);
export { EditFolderScreen };
