import React from 'react';
import { connect } from 'react-redux';
import { fetchProfile, saveProfile } from '../../../state/action';
import { EditConfigurationScreenComponent } from './EditConfigurationScreenComponent';

class EditConfigurationScreenContainer extends React.Component {

  componentDidMount(){
    this.props.dispatch(fetchProfile());
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleSaveClick = () => {
    //TODO: receive and send data
    this.props.dispatch(saveProfile());
  };

  render() {
    return (
      <EditConfigurationScreenComponent
        onSave={this.handleSaveClick}
        onBack={this.handleBackClick}
        profile={this.props.profile}
        loading={this.props.loading}/>
    );
  }
}

const mapStateToProps = ({ profileReducer }) => {
  return {...profileReducer };
};

const EditConfigurationScreen = connect(mapStateToProps)(EditConfigurationScreenContainer);
export { EditConfigurationScreen };
