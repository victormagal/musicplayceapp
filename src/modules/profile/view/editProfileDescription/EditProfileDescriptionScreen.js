import React from 'react';
import { connect } from 'react-redux';
import { 
  updateArtist,
} from '../../../../state/action';
import { EditProfileDescriptionComponent } from './EditProfileDescriptionComponent';
import { 
  MPProfileSuccess
} from '../../../../components';

class EditProfileDescriptionScreenContainer extends React.Component {

  componentWillReceiveProps(nextProps){
    if(nextProps.artistSaveSuccess) {
      this.props.navigation.navigate('message', { component: MPProfileSuccess });
    }
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleSaveClick = (params) => {
    let profile = {...this.props.profile};
    profile.description = params.description;
    this.props.dispatch(updateArtist(this.props.profile.id, profile));
  };

  render() {
    return (
      <EditProfileDescriptionComponent
        onSave={this.handleSaveClick}
        onBack={this.handleBackClick}
      />
    );
  }
}

const mapStateToProps = ({ profileReducer, artistReducer }) => {
  return {...profileReducer, ...artistReducer};
};

const EditProfileDescriptionScreen = connect(mapStateToProps)(EditProfileDescriptionScreenContainer);
export { EditProfileDescriptionScreen };
