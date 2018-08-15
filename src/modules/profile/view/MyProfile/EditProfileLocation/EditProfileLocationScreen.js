import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../../../../state/action';
import { EditProfileLocation } from './EditProfileLocationComponent';
import { MPProfileSuccess } from '../../../../../components/index';

class EditProfileLocationScreenContainer extends React.Component {

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
    profile.city = params.city;
    profile.state = params.state;
    this.props.dispatch(updateUser(profile));
  };

  render() {
    const { navigation } = this.props;
    const navigationParams = navigation.state.params;
    return (
      <EditProfileLocation
        location={navigationParams && navigationParams.location}
        onSave={this.handleSaveClick}
        onBack={this.handleBackClick}
      />
    );
  }
}

const mapStateToProps = ({ profileReducer, userReducer }) => {
  return {...profileReducer, ...userReducer};
};

const EditProfileLocationScreen = connect(mapStateToProps)(EditProfileLocationScreenContainer);
export { EditProfileLocationScreen };
