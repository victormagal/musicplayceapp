import React from 'react';
import { connect } from 'react-redux';
import {
  fetchProfile,
  saveProfile
} from '../../../../state/action';
import { HelpSettingsScreenComponent } from './HelpSettingsScreenComponent';
import {
  MPHelp
} from '../../../../components';

class HelpSettingsScreenContainer extends React.Component {

  pages = {
    'help': MPHelp
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
      <HelpSettingsScreenComponent
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

const HelpSettingsScreen = connect(mapStateToProps)(HelpSettingsScreenContainer);
export { HelpSettingsScreen };
