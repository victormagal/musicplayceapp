import React from 'react';
import { connect } from 'react-redux';
import { updateArtist } from '../../../../state/action';
import { EditProfileLocation } from './EditProfileLocationComponent';
import { MPProfileSuccess } from '../../../../components';

class EditProfileLocationScreenContainer extends React.Component {
  componentWillReceiveProps(nextProps){
    if (nextProps.artistSaveSuccess) {
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
    this.props.dispatch(updateArtist(profile.id, profile));
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

const mapStateToProps = ({ profileReducer, artistReducer }) => {
  return {...profileReducer, ...artistReducer};
};

const EditProfileLocationScreen = connect(mapStateToProps)(EditProfileLocationScreenContainer);
export { EditProfileLocationScreen };
