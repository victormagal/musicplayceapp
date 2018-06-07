import React from 'react';
import { connect } from 'react-redux';
import {
  fetchProfile,
  saveProfile
} from '../../../state/action';
import { HelpConfigurationScreenComponent } from './HelpConfigurationScreenComponent';
import {
  MPHelp
} from '../../../components';

class HelpConfigurationScreenContainer extends React.Component {

  pages = {
    'help': MPHelp
  };

  componentDidMount() {
    this.props.dispatch(fetchProfile());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.saveProfileSuccess) {
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
      <HelpConfigurationScreenComponent
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

const HelpConfigurationScreen = connect(mapStateToProps)(HelpConfigurationScreenContainer);
export { HelpConfigurationScreen };
