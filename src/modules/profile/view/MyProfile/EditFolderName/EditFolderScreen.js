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
    }
  }

  componentDidMount(){
    if(this.props.navigation.state && this.props.navigation.state.params){
      let {folderId} = this.props.navigation.state.params;
      if(folderId){
        this.setState({folderId});
      }
    }
  }

  handleSaveClick = (newName) => {
    this.props.dispatch(updateFolderName(this.state.folderId, newName));
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
      />
    );
  }
}

const mapStateToProps = ({ folderReducer }) => {
  return {...folderReducer };
};

const EditFolderScreen = connect(mapStateToProps)(EditFolderScreenContainer);
export { EditFolderScreen };
