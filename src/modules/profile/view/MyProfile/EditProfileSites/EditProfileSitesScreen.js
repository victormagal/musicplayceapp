import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../../../../state/action';
import { EditProfileSitesComponent } from './EditProfileSitesComponent';
import { MPProfileSuccess } from '../../../../../components/index';

class EditProfileSitesScreenContainer extends React.Component {
  componentWillReceiveProps(nextProps){
    if (nextProps.isUserSaved) {
      this.props.navigation.navigate('message', { component: MPProfileSuccess });
    }
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleSaveClick = (params) => {
    const profile = {...this.props.profile};
    profile.social_networks = params.social_networks;
    this.props.dispatch(updateUser(profile));
  };

  render() {
    const { navigation } = this.props;
    const navigationParams = navigation.state.params;
    return (
      <EditProfileSitesComponent
        social={navigationParams && navigationParams.social}
        onSave={this.handleSaveClick}
        onBack={this.handleBackClick}
      />
    );
  }
}

const mapStateToProps = ({ profileReducer, userReducer }) => {
  return {...profileReducer, ...userReducer};
};

const EditProfileSitesScreen = connect(mapStateToProps)(EditProfileSitesScreenContainer);
export { EditProfileSitesScreen };
