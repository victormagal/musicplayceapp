import React from 'react';
import { connect } from 'react-redux';
import {
  fetchProfile,
  saveProfile
} from '../../../../state/action';
import { PasswordSettingsScreenComponent } from './PasswordSettingsScreenComponent';
import {
  MPPassword
} from '../../../../components';

class PasswordSettingsScreenContainer extends React.Component {

  pages = {
    'password': MPPassword
  };

  componentDidMount() {
    this.props.dispatch(fetchProfile());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.saveProfileSuccess) {
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
      <PasswordSettingsScreenComponent
        onSave={this.handleSaveClick}
        onBack={this.handleBackClick}
        profile={this.props.profile}
        loading={this.props.loading}
      />
    );
  }
}

const mapStateToProps = ({ profileReducer }) => {
  return { ...profileReducer };
};

const PasswordSettingsScreen = connect(mapStateToProps)(PasswordSettingsScreenContainer);
export { PasswordSettingsScreen };
