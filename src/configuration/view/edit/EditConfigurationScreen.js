import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { fetchProfile, saveProfile } from '../../../state/action';
import { EditConfigurationScreenComponent } from './EditConfigurationScreenComponent';
import { MPGradientButton } from '../../../components';

class ProfileSuccess extends React.Component{

  handleOkClick = () => {
    this.props.navigation.pop();
  };

  render(){
    return (
      <View>
        <Text>Identificação atualizada com sucesso VICTORRR</Text>
        <MPGradientButton title="OK" onPress={this.handleOkClick}/>
      </View>
    );
  }
}

class PhoneSuccess extends React.Component{

  handleOkClick = () => {
    this.props.navigation.replace('messageConfiguration', {component: ProfileSuccess});
  };

  render(){
    return (
      <View>
        <Text>Identificação atualizada com sucesso</Text>
        <MPGradientButton title="Cancelar" onPress={this.handleOkClick}/>
        <MPGradientButton title="Reenviar SMS" onPress={this.handleOkClick}/>
      </View>
    );
  }
}

class EditConfigurationScreenContainer extends React.Component {

  componentDidMount(){
    this.props.dispatch(fetchProfile());
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.saveProfileSuccess){
      this.props.navigation.navigate('messageConfiguration', {component: PhoneSuccess});
    }
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
