import React from 'react';
import { connect } from 'react-redux';
import { 
  fetchProfile, 
  saveProfile 
} from '../../../../state/action';
import { EditSettingsScreenComponent } from './EditSettingsScreenComponent';
import { 
  MPProfileSuccess,
  MPMail,
  MPPhone
} from '../../../../components';
import {MPPhoneSuccess} from "../../../../components/settings";

class EditSettingsScreenContainer extends React.Component {

  sections = {
    'profile': MPProfileSuccess,
    'email': MPMail,
    //'cell_phone': MPPhone
    'cell_phone': MPPhoneSuccess
  };

  componentDidMount(){
    this.props.dispatch(fetchProfile());
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.saveProfileSuccess) {
      this.props.navigation.navigate('message', {
        component: this.sections[nextProps.section],
        data: nextProps.responseData[nextProps.section]
      });
    }
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleSaveClick = (formData, section) => {
    this.props.dispatch(saveProfile(formData, section));
  };

  render() {
    return (
      <EditSettingsScreenComponent
        onSave={(formData, section) => this.handleSaveClick(formData, section)}
        onBack={this.handleBackClick}
        profile={this.props.profile}
        loading={this.props.loading}
      />
    );
  }
}

const mapStateToProps = ({ profileReducer }) => {
  return {...profileReducer };
};

const EditSettingsScreen = connect(mapStateToProps)(EditSettingsScreenContainer);
export { EditSettingsScreen };
