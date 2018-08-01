import React from 'react';
import { connect } from 'react-redux';
import { updateArtist } from '../../../../state/action';
import { EditProfileSitesComponent } from './EditProfileSitesComponent';
import { MPProfileSuccess } from '../../../../components';

class EditProfileSitesScreenContainer extends React.Component {
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
    profile.social_networks = params.social_networks;
    this.props.dispatch(updateArtist(profile.id, profile));
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

const mapStateToProps = ({ profileReducer, artistReducer }) => {
  return {...profileReducer, ...artistReducer};
};

const EditProfileSitesScreen = connect(mapStateToProps)(EditProfileSitesScreenContainer);
export { EditProfileSitesScreen };
