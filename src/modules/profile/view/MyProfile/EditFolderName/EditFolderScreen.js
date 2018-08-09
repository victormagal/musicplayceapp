import React from 'react';
import { connect } from 'react-redux';
import { 
  fetchProfile, 
  saveProfile 
} from '../../../../../state/action';
import { EditFolderComponent } from './EditFolderComponent';
import { 
  MPProfileSuccess,
  MPMail,
  MPPhone
} from '../../../../../components/index';

class EditFolderScreenContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      folder: null,
    }
  }

  componentDidMount(){
    if(this.props.navigation.state && this.props.navigation.state.params){
      let {selectedFolder} = this.props.navigation.state.params;
      if(selectedFolder){
        this.setState(selectedFolder);
      }
    }
  }

  handleSaveClick = (newName) => {
    this.props.dispatch(updateFolderName(this.state.selectedFolder.id, newName));
    this.props.navigation.pop();
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  }

  render() {
    return (
      <EditFolderComponent
        {...this.props}
        onSave={this.handleSaveClick}
        onBack={this.handleBackClick}
        profile={this.props.profile}
      />
    );
  }
}

const mapStateToProps = ({ folderReducer }) => {
  return {...folderReducer };
};

const EditFolderScreen = connect(mapStateToProps)(EditFolderScreenContainer);
export { EditFolderScreen };
