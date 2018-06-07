import React from 'react';
import { connect } from 'react-redux';
import { 
  fetchProfile, 
  saveProfile 
} from '../../../../state/action';
import { EditConfigurationScreenComponent } from './EditConfigurationScreenComponent';
import { 
  MPGradientButton, 
  MPProfileSuccess,
  MPMail,
  MPPhone
} from '../../../../components';

class EditConfigurationScreenContainer extends React.Component {

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
      this.props.navigation.navigate('messageConfiguration', { component: this.pages[nextProps.page] });
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
      <EditConfigurationScreenComponent
        onSave={this.handleSaveClick}
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

const EditConfigurationScreen = connect(mapStateToProps)(EditConfigurationScreenContainer);
export { EditConfigurationScreen };
