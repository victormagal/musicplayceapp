import React from 'react';
import { connect } from 'react-redux';
import { fetchFAQHelp } from '../../../../state/action';
import { HelpSettingsScreenComponent } from './HelpSettingsScreenComponent';
import { MPHelp } from '../../../../components';

class HelpSettingsScreenContainer extends React.Component {
  pages = {
    'help': MPHelp
  };

  componentDidMount() {
    this.props.dispatch(fetchFAQHelp());
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleQuestionNotFound = (page) => {
    this.props.navigation.navigate(page);
  };

  render() {
    return (
      <HelpSettingsScreenComponent
        onQuestionNotFound={this.handleQuestionNotFound}
        onBack={this.handleBackClick}
        loading={this.props.loading}
        faqs={this.props.faqs}
      />
    );
  }
}

const mapStateToProps = ({ helpReducer }) => {
  return { ...helpReducer };
};

const HelpSettingsScreen = connect(mapStateToProps)(HelpSettingsScreenContainer);
export { HelpSettingsScreen };
