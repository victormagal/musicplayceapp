import React from 'react';
import { connect } from 'react-redux';
import { fetchProfile } from '../../../state/action';
import { EditConfigurationScreenComponent } from './EditConfigurationScreenComponent';

class EditConfigurationScreenContainer extends React.Component {

  componentDidMount(){
    this.props.dispatch(fetchProfile());
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <EditConfigurationScreenComponent onBack={this.handleBackClick} profile={this.props.profile}/>
    );
  }
}

const mapStateToProps = ({ profileReducer }) => {
  return {...profileReducer };
};

const EditConfigurationScreen = connect(mapStateToProps)(EditConfigurationScreenContainer);
export { EditConfigurationScreen };