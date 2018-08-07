import React from 'react';
import { connect } from 'react-redux';
import {
  fetchProfile,
  saveProfile
} from '../../../../state/action';
import { PasswordSettingsScreenComponent } from './PasswordSettingsScreenComponent';
import { MPPassword } from '../../../../components';

class PasswordSettingsScreenContainer extends React.Component {
  pages = {
    'password': MPPassword
  };

  state = {
    newPassword: null
  };

  componentDidMount() {
    this.props.dispatch(fetchProfile());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.saveProfileSuccess) {
      this.props.navigation.navigate('message', {
        component: this.pages['password'],
        newPassword: this.state.newPassword
      });
    }
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleSaveClick = (formData, page) => {
    this.props.dispatch(saveProfile(formData, page));
    this.setState({ newPassword: formData.password });
  };

  render() {
    return (
      <PasswordSettingsScreenComponent
        onSave={(data, page) => this.handleSaveClick(data, page)}
        onBack={this.handleBackClick}
        profile={this.props.profile}
        loading={this.props.loading}
        saveProfileError={this.props.saveProfileError}
      />
    );
  }
}

const mapStateToProps = ({ profileReducer }) => {
  return { ...profileReducer };
};

const PasswordSettingsScreen = connect(mapStateToProps)(PasswordSettingsScreenContainer);
export { PasswordSettingsScreen };
