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

  pages = {
    'profile': MPProfileSuccess,
    'email': MPMail,
    'phone': MPPhone
  };

  componentDidMount(){
    this.props.dispatch(fetchProfile());
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.saveProfileSuccess) {
      this.props.navigation.navigate('message', { component: this.pages[nextProps.page] });
    }
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleSaveClick = (page) => {
    this.props.dispatch(saveProfile({}, page));
  };

  render() {
    return (
      <EditFolderComponent
        onSave={this.handleSaveClick}
        onBack={this.handleBackClick}
        profile={this.props.profile}
      />
    );
  }
}

const mapStateToProps = ({ profileReducer }) => {
  return {...profileReducer };
};

const EditFolderScreen = connect(mapStateToProps)(EditFolderScreenContainer);
export { EditFolderScreen };
